import * as path from "node:path";
import { config as dotenvConfig } from "dotenv";

// Load .env
dotenvConfig({ path: path.resolve(process.cwd(), "../../.env") });
dotenvConfig();

import { db } from "./index";
import { movies } from "./schema";

async function main() {
  try {
    const allMovies = await db.select().from(movies);
    console.log(
      "🎬 Filmes no Banco de Dados:",
      JSON.stringify(allMovies, null, 2),
    );
    process.exit(0);
  } catch (error) {
    console.error("Falha ao buscar filmes:", error);
    process.exit(1);
  }
}

main();
