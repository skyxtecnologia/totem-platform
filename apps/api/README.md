# Totem Platform API

Backend unificado da Plataforma Totem, construído com **Hono** e hospedado no **Cloudflare Workers**.

## Stack

| Tecnologia | Uso |
|---|---|
| [Hono](https://hono.dev) | Framework HTTP (edge-native) |
| [Drizzle ORM](https://orm.drizzle.team) | Queries tipadas no PostgreSQL |
| [Cloudflare Workers](https://workers.cloudflare.com) | Runtime de produção |
| [Wrangler](https://developers.cloudflare.com/workers/wrangler/) | Dev server e deploy |

## Desenvolvimento local

```bash
# Na raiz do monorepo — inicia Postgres, Redis e MinIO
pnpm docker:dev

# Inicia o servidor de desenvolvimento na porta 8787
pnpm --filter api dev
```

Variáveis locais ficam em `.dev.vars` (ignorado pelo git):

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/totem_db"
JWT_DEVICE_SECRET="sua-chave-aqui"
```

## Endpoints

### Públicos

| Método | Rota | Descrição |
|---|---|---|
| `GET` | `/` | Info da API |
| `GET` | `/health` | Health check |

### Dispositivos (`/api/v1/device/*`)

Requer header: `Authorization: Bearer <device_jwt>`

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/api/v1/device/heartbeat` | Atualiza status do totem |

## Deploy

```bash
pnpm --filter api deploy
```

