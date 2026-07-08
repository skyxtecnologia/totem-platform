# Guia de Desenvolvimento da API

Este documento serve como um guia para desenvolver e manter a API da Plataforma Totem, localizada em `apps/api`.

## 1. Visão Geral da Stack

-   **Framework:** Hono
-   **Runtime:** Cloudflare Workers (via `wrangler`)
-   **Linguagem:** TypeScript

Escolhemos Hono por ser um framework web ultrarrápido, leve e que funciona em qualquer runtime JavaScript, o que nos dá flexibilidade para o deploy.

## 2. Estrutura de Pastas

O código-fonte da API reside inteiramente dentro de `apps/api`. A estrutura principal é:

```
apps/api/
├── src/
│   ├── index.ts      # Ponto de entrada principal, registro de rotas
│   └── (outros módulos...)
├── package.json      # Dependências e scripts da API
└── tsconfig.json     # Configurações TypeScript da API
```

-   **`src/index.ts`**: É o coração da aplicação. É aqui que a instância do Hono é criada e as rotas principais são definidas.
-   **Outros Módulos**: Conforme a API crescer, criaremos subdiretórios dentro de `src/` para organizar rotas, middlewares, serviços e tipos. Por exemplo: `src/routes/`, `src/middlewares/`.

## 3. Rodando o Servidor de Desenvolvimento

Para iniciar a API em modo de desenvolvimento, siga estes passos:

1.  **Abra um terminal** na raiz do monorepo (`totem-platform/`).
2.  **Navegue até a pasta da API**:
    ```bash
    cd apps/api
    ```
3.  **Execute o script `dev`**:
    ```bash
    pnpm dev
    ```
    Este comando utiliza o `wrangler` (a ferramenta de linha de comando para Cloudflare Workers) para iniciar um servidor local que recarrega automaticamente (`hot-reload`) sempre que você altera um arquivo.

Por padrão, a API estará disponível em `http://localhost:8787`.

Você pode verificar se ela está funcionando acessando o endpoint de health check: http://localhost:8787/health.

## 4. Criando Novas Rotas

Para adicionar uma nova rota, você edita o arquivo `apps/api/src/index.ts`.

**Exemplo de uma nova rota `GET /hello`:**

```typescript
import { Hono } from "hono";

const app = new Hono();

// ... rotas existentes

app.get("/hello", (c) => {
  return c.json({ message: "Olá, mundo!" });
});

export default app;
```

## 5. Interação com o Banco de Dados

Graças à configuração do monorepo, você pode importar o cliente do banco de dados diretamente de `packages/db`.

Dentro de qualquer rota, você pode importar e usar o `db` para fazer consultas:

```typescript
import { db } from "@totem/db";
import { tenants } from "@totem/db/schema";

// Dentro de uma rota...
app.get("/tenants", async (c) => {
  const allTenants = await db.select().from(tenants);
  return c.json(allTenants);
});
```

Este guia deve cobrir os pontos essenciais para você começar a construir os endpoints da sua API.
