import { config as dotenvConfig } from "dotenv";
import * as path from "node:path";
import { defineConfig } from "drizzle-kit";

dotenvConfig({ path: path.resolve(process.cwd(), "../../.env") });

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/schema/index.ts",
  out: "./migrations",
  dbCredentials: {
    url: process.env.DATABASE_URL ?? "",
  },
  verbose: true,
  strict: true,
});
