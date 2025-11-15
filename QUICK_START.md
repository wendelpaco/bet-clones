# Quick Start - Gerenciador de Clones

Guia rápido para rodar o projeto localmente.

## Pré-requisitos

- Node.js 18+ instalado
- PostgreSQL instalado e rodando
- npm ou yarn

## Passos para Iniciar

### 1. Instalar Dependências

```bash
npm install
```

### 2. Configurar Banco de Dados

Crie o arquivo `.env`:

```bash
cp .env.example .env
```

Edite `.env` e configure sua URL do PostgreSQL:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/bet_clones"
```

### 3. Criar Banco de Dados

```bash
# Acesse o PostgreSQL
psql -U postgres

# Crie o banco
CREATE DATABASE bet_clones;

# Saia
\q
```

### 4. Executar Migrações

```bash
npx prisma migrate dev --name init
```

### 5. Gerar Prisma Client

```bash
npx prisma generate
```

### 6. Iniciar o Servidor

```bash
npm run dev
```

Acesse: http://localhost:3000

## Comandos Úteis

```bash
# Abrir Prisma Studio (visualizar dados)
npm run db:studio

# Resetar banco (apaga tudo)
npx prisma migrate reset

# Ver logs do PostgreSQL
tail -f /usr/local/var/log/postgresql@15.log  # macOS
```

## Pronto!

O projeto está rodando em http://localhost:3000

Navegue para:
- `/houses` - Gerenciar casas de apostas
- `/no-clones` - Casas sem clones
