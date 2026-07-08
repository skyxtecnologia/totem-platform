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

import { neon } from "@neondatabase/serverless";
import { drizzle as drizzleNeon } from "drizzle-orm/neon-http";
import type { NeonHttpDatabase } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// ─── Lazy singleton ──────────────────────────────────────────────────────────
// biome-ignore lint/suspicious/noExplicitAny: singleton dinâmico de múltiplos drivers de banco
let _db: any = null;

/**
 * Returns the Drizzle database instance, lazily initialized.
 * - On Cloudflare Workers / Neon: uses @neondatabase/serverless (HTTP)
 * - On local Node.js / Docker:   uses pg Pool (via dynamic import)
 */
// biome-ignore lint/suspicious/noExplicitAny: singleton dinâmico de múltiplos drivers de banco
export function getDb(): any {
  if (_db) return _db;

  if (!process.env.DATABASE_URL) {
    throw new Error(
      "DATABASE_URL is not set. Ensure the env-bridge middleware has run before calling getDb().",
    );
  }

  const isNeon = process.env.DATABASE_URL.includes("neon.tech");

  if (isNeon) {
    // Neon HTTP driver — edge-compatible, no TCP sockets needed
    const client = neon(process.env.DATABASE_URL);
    _db = drizzleNeon(client, { schema });
  } else {
    // Node.js pg Pool — for local Docker dev
    // Dynamic require prevents esbuild/wrangler from bundling pg at build time
    // biome-ignore lint/style/noCommaOperator: dynamic require trick to hide from esbuild
    const _require =
      typeof require !== "undefined"
        ? require
        : (0, eval)('typeof require !== "undefined" ? require : undefined');
    if (!_require) {
      throw new Error("Node.js require() is not available in this runtime.");
    }
    const { Pool } = _require("pg");
    const { drizzle: drizzleNode } = _require("drizzle-orm/node-postgres");
    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 4,
      idleTimeoutMillis: 100,
      connectionTimeoutMillis: 1500,
    });
    _db = drizzleNode(pool, {
      schema,
      logger: process.env.NODE_ENV !== "production",
    });
  }

  return _db;
}

// Convenience re-export so `import { db } from "@totem/db"` still works
// The Proxy delegates every property access to the lazy singleton
export const db = new Proxy({} as NeonHttpDatabase<typeof schema>, {
  get(_target, prop) {
    return Reflect.get(getDb(), prop);
  },
});

export * from "drizzle-orm";
// Export all schemas and enums for easy access
export * from "./schema";
