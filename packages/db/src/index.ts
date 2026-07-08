import * as path from "node:path";
import { config as dotenvConfig } from "dotenv";

// Load .env from monorepo root (safe for Node runtimes; ignored silently in CF Workers)
if (typeof process !== "undefined" && typeof process.cwd === "function") {
  try {
    dotenvConfig({ path: path.resolve(process.cwd(), "../../.env") });
    dotenvConfig();
  } catch {
    // Gracefully ignore — CF Workers sandbox does not expose filesystem
  }
}

import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

// ─── Lazy singleton ──────────────────────────────────────────────────────────
// Pool is created on first call to getDb() so that process.env.DATABASE_URL
// is already populated by the CF Workers env-bridge middleware before any
// database query runs.
let _pool: Pool | null = null;
let _db: NodePgDatabase<typeof schema> | null = null;

export function getDb(): NodePgDatabase<typeof schema> {
  if (!_db) {
    if (!process.env.DATABASE_URL) {
      throw new Error(
        "DATABASE_URL is not set. Ensure the env-bridge middleware has run before calling getDb().",
      );
    }
    _pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 4, // Permite concorrência de queries sequenciais na mesma rota
      idleTimeoutMillis: 100, // Libera e fecha sockets ociosos quase que instantaneamente (100ms)
      connectionTimeoutMillis: 1500,
    });
    _db = drizzle(_pool, {
      schema,
      logger: process.env.NODE_ENV !== "production",
    });
  }
  return _db;
}

// Convenience re-export so existing `import { db } from "@totem/db"` still works
export const db = new Proxy({} as NodePgDatabase<typeof schema>, {
  get(_target, prop) {
    return Reflect.get(getDb(), prop);
  },
});

export * from "drizzle-orm";
// Export all schemas and enums for easy access
export * from "./schema";
