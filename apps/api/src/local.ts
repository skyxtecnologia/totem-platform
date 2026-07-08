import * as path from "node:path";
import { serve } from "@hono/node-server";
import { config as dotenvConfig } from "dotenv";

// Load .env variables from monorepo root
dotenvConfig({ path: path.resolve(process.cwd(), "../../.env") });
dotenvConfig();

import app from "./index";

const port = 8787;
console.log(
  `🚀 Servidor de Desenvolvimento Hono (Node.js) ativo em: http://localhost:${port}`,
);

serve({
  fetch: app.fetch,
  port,
});
