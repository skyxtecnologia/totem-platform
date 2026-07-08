# Plano de Implementação Detalhado — Plataforma Totem

Este documento detalha o passo a passo para a construção da Plataforma Totem, com base no `ARQUITETURA.md`. Ele está organizado em um formato de issues, sub-issues e tarefas, facilitando o acompanhamento do progresso e a distribuição de trabalho, seja para desenvolvimento manual ou com a assistência de um agente de IA.

---

## Fase 1: Fundação (semana 1)

### 🚀 Issue 1: Configurar Ambiente de Desenvolvimento e Monorepo

O objetivo é estabelecer a base do projeto, incluindo a estrutura do monorepo, o ambiente de desenvolvimento local e o schema inicial do banco de dados.

#### 1.1. Sub-issue: Estruturar Workspace (abordagem manual, sem Turborepo)

- [x] **Tarefa 1.1.1:** Criar a estrutura de pastas base do monorepo.
- [x] **Tarefa 1.1.2:** Adotar abordagem manual (sem Turborepo) para gerenciamento do workspace.
- [x] **Tarefa 1.1.3:** Criar os pacotes de configuração compartilhada em `packages/config`.
- Nota: O pacote ui será configurado para servir apenas o dashboard, conforme definido na arquitetura.
- [x] **Tarefa 1.1.4:** Criar o arquivo `.editorconfig` na raiz do projeto.

#### 1.2. Sub-issue: Configurar Ambiente Docker Local

- [x] **Tarefa 1.2.1:** Criar o arquivo `docker-compose.yml` na raiz com os serviços.
  - `postgres`: Versão 16
  - `redis`: Versão 7
  - `minio`: Versão `latest`
- [x] **Tarefa 1.2.2:** Criar o arquivo `.env.example` com as variáveis de ambiente.
- [x] **Tarefa 1.2.3:** Adicionar um script no `package.json` raiz para iniciar o ambiente Docker.

#### 1.3. Sub-issue: Criar Schema do Banco de Dados com Drizzle

- [x] **Tarefa 1.3.1:** Configurar o pacote `packages/db` para usar Drizzle ORM.
- [x] **Tarefa 1.3.2:** Definir os schemas Drizzle para as tabelas principais.
- [x] **Tarefa 1.3.3:** Gerar e aplicar a primeira migração do banco de dados.

#### 1.4. Sub-issue: Estruturar API e Autenticação

- [x] **Tarefa 1.4.1:** Inicializar o projeto Hono em `apps/api`.
- [x] **Tarefa 1.4.2:** Criar um endpoint de health check (`/health`) para validar que a API está no ar.
- [x] **Tarefa 1.4.3:** Implementar o middleware de isolamento de `tenantId` e o middleware de autenticação de dispositivo (JWT).
- [x] **Tarefa 1.4.4:** Configurar o projeto Next.js em `apps/dashboard` e integrar o Better Auth.
- [x] **Tarefa 1.4.5:** Criar a rota de login no dashboard e proteger uma rota de exemplo.

---

## Fase 2: Figma e Design System (semana 1–2)

### 🎨 Issue 2: Traduzir Design Figma para Código

O objetivo é extrair o design do protótipo Figma e aplicá-lo como um design system reutilizável para o dashboard e o app totem.

#### 2.1. Sub-issue: Extrair Design Tokens do Figma

- [ ] **Tarefa 2.1.1:** Autenticar o agente de IA no Figma (MCP) para inspecionar o protótipo.
- [ ] **Tarefa 2.1.2:** Extrair os design tokens: cores, tipografia, espaçamentos, raios de borda.
- [ ] **Tarefa 2.1.3:** Documentar os tokens extraídos no arquivo `docs/design-tokens.md`.

#### 2.2. Sub-issue: Implementar Design System no Dashboard

- [ ] **Tarefa 2.2.1:** Configurar o `tailwind.config.js` em `apps/dashboard` para usar os tokens extraídos do Figma.
- [ ] **Tarefa 2.2.2:** Inicializar `shadcn/ui` no projeto `apps/dashboard`.
- [ ] **Tarefa 2.2.3:** Adicionar os componentes base de `shadcn/ui` necessários para o layout principal (ex: `sidebar`, `card`).
- [ ] **Tarefa 2.2.4:** Construir o layout principal do dashboard (sidebar, header, área de conteúdo) alinhado ao protótipo.

#### 2.3. Sub-issue: Implementar Tema no App Totem

- [ ] **Tarefa 2.3.1:** Criar um arquivo de tema (ex: `theme.ts`) em `apps/totem`.
- [ ] **Tarefa 2.3.2:** Mapear manualmente os design tokens de `docs/design-tokens.md` para o tema do React Native (StyleSheet).

---

## Fase 3: Conteúdo e Anúncios (semana 2–3)

### 📝 Issue 3: Implementar Funcionalidades de CMS e Anúncios

O foco é desenvolver os CRUDs no dashboard e a sincronização de dados com o app totem.

#### 3.1. Sub-issue: Desenvolver CRUDs no Dashboard

- [ ] **Tarefa 3.1.1:** Criar as páginas e formulários no dashboard para o CRUD de Módulos de Conteúdo e Itens de Conteúdo.
- [ ] **Tarefa 3.1.2:** Implementar o CRUD para Campanhas de Anúncios e Criativos.
- [ ] **Tarefa 3.1.3:** Desenvolver a interface para agendamento de publicações (`content_schedules` e `ad_schedules`).
- [ ] **Tarefa 3.1.4:** Implementar o upload de mídia via presigned URLs do S3.

#### 3.2. Sub-issue: Desenvolver Endpoints da API

- [ ] **Tarefa 3.2.1:** Criar os endpoints da API Hono (`/v1/admin/content`, `/v1/admin/ads`, etc.) para suportar os CRUDs do dashboard.
- [ ] **Tarefa 3.2.2:** Implementar o endpoint de sincronização delta para o totem: `GET /v1/totem/sync?since={timestamp}`.

#### 3.3. Sub-issue: Implementar Sincronização no App Totem

- [ ] **Tarefa 3.3.1:** Configurar `react-native-mmkv` e `@tanstack/react-query` em `apps/totem`.
- [ ] **Tarefa 3.3.2:** Implementar a lógica de `sync` que chama a API, recebe o delta de dados e persiste localmente no MMKV.
- [ ] **Tarefa 3.3.3:** Criar a tela de "Idle" no totem que exibe os anúncios sincronizados em um carrossel.

---

## Fase 4: Experiência do Usuário no Totem (semana 3–4)

### 📱 Issue 4: Construir a Interface e Navegação do App Totem

O objetivo é desenvolver as telas interativas do totem, garantindo uma experiência de usuário fluida e funcional.

#### 4.1. Sub-issue: Desenvolver Telas de Conteúdo

- [ ] **Tarefa 4.1.1:** Implementar a tela Home com o menu principal (Turismo, Eventos, Gastronomia, Cinema).
- [ ] **Tarefa 4.1.2:** Criar as telas para cada módulo de conteúdo, lendo os dados do cache local (MMKV).
- [ ] **Tarefa 4.1.3:** Desenvolver a tela de detalhe de um Ponto Turístico (`PoiDetail`), incluindo um mapa simplificado.

#### 4.2. Sub-issue: Implementar Fluxo de Emergência

- [ ] **Tarefa 4.2.1:** Adicionar o botão fixo de "Emergência" na interface.
- [ ] **Tarefa 4.2.2:** Criar a tela de confirmação (`CallConfirm`) para evitar chamadas acidentais.
- [ ] **Tarefa 4.2.3:** Implementar a chamada ao discador do sistema (`Linking.openURL('tel:...')`).

#### 4.3. Sub-issue: Coleta de Analytics

- [ ] **Tarefa 4.3.1:** Implementar a lógica para registrar eventos de analytics (`screen_view`, `ad_impression`, etc.) localmente.
- [ ] **Tarefa 4.3.2:** Desenvolver o endpoint de ingestão de eventos na API (`/v1/admin/analytics`).
- [ ] **Tarefa 4.3.3:** Implementar o envio em lote (batch) dos eventos do totem para a API.

---

## Fase 5: Monitoramento e Analytics (semana 4–5)

### 📊 Issue 5: Desenvolver Ferramentas de Gestão e Análise

O foco é dar aos operadores visibilidade sobre o status dos totens e o comportamento dos usuários.

#### 5.1. Sub-issue: Monitoramento de Dispositivos

- [ ] **Tarefa 5.1.1:** Implementar o fluxo de registro de dispositivo (pairing code).
- [ ] **Tarefa 5.1.2:** Implementar o envio de `heartbeat` em background a cada 60s no app totem.
- [ ] **Tarefa 5.1.3:** Criar o dashboard de monitoramento em tempo real, mostrando status (online/offline), localização e alertas.

#### 5.2. Sub-issue: Dashboard de Analytics

- [ ] **Tarefa 5.2.1:** Desenvolver os endpoints na API para queries agregadas de analytics.
- [ ] **Tarefa 5.2.2:** Implementar os gráficos e tabelas no dashboard web usando Recharts (impressões, telas mais vistas, etc.).
- [ ] **Tarefa 5.2.3:** Adicionar a funcionalidade de exportação de dados para CSV.

#### 5.3. Sub-issue: Agendamento de Tarefas

- [ ] **Tarefa 5.3.1:** Configurar BullMQ e Redis na API.
- [ ] **Tarefa 5.3.2:** Criar os workers para processar jobs de publicação/despublicação de conteúdos e campanhas com base nos agendamentos.

---

## Fase 6: Multi-tenant e Finalização (semana 5–6)

### 🛡️ Issue 6: Implementar RBAC, Multi-tenancy e Preparar para Deploy

O objetivo é robustecer o sistema com controle de acesso, isolamento de dados e preparar os pacotes para o deploy.

#### 6.1. Sub-issue: Gestão de Acesso e Tenants

- [ ] **Tarefa 6.1.1:** Criar as interfaces no dashboard para `super_admin` gerenciar tenants e usuários.
- [ ] **Tarefa 6.1.2:** Implementar a atribuição de papéis (`tenant_admin`, `editor`, `viewer`) aos usuários.
- [ ] **Tarefa 6.1.3:** Reforçar a validação de `tenantId` e permissões (RBAC) em todos os endpoints da API.

#### 6.2. Sub-issue: Testes e Documentação

- [ ] **Tarefa 6.2.1:** Escrever testes E2E para os fluxos críticos (login, sync, CRUD de conteúdo).
- [ ] **Tarefa 6.2.2:** Documentar o processo de build do app Android em modo kiosk no README de `apps/totem`.
- [ ] **Tarefa 6.2.3:** Revisar e finalizar a documentação do projeto.

#### 6.3. Sub-issue: Preparação para Deploy

- [ ] **Tarefa 6.3.1:** Configurar os pipelines de CI/CD para deploy da API (Railway/Fly.io), Dashboard (Vercel) e Banco (Neon/RDS).
- [ ] **Tarefa 6.3.2:** Configurar o EAS Build para gerar os artefatos do app Android (APK/AAB).
- [ ] **Tarefa 6.3.3:** Realizar um teste de deploy completo em ambiente de staging.
