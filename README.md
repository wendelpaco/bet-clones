# Gerenciador de Clones de Apostas

Sistema completo para gerenciar casas de apostas e seus clones, desenvolvido com Next.js (canary), TypeScript, Prisma, PostgreSQL, Tailwind CSS e shadcn/ui.

## Funcionalidades

- ✅ Gerenciar casas de apostas (criar, editar, listar, deletar)
- ✅ Adicionar clones para cada casa com URL e notas
- ✅ Registrar casas que não possuem clones
- ✅ Interface moderna com Tailwind CSS e shadcn/ui
- ✅ Validação de dados com Zod
- ✅ API Routes completas
- ✅ Server-side rendering (SSR)
- ✅ Feedback visual com toasts

## Stack Tecnológica

- **Framework**: Next.js (canary) com App Router
- **Linguagem**: TypeScript
- **Banco de Dados**: PostgreSQL
- **ORM**: Prisma
- **Estilização**: Tailwind CSS
- **Componentes UI**: shadcn/ui
- **Validação**: Zod
- **Ícones**: Lucide React

## Estrutura do Projeto

```
bet-clones/
├── app/
│   ├── api/
│   │   ├── houses/
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   │       ├── route.ts
│   │   │       └── clones/route.ts
│   │   ├── clones/[id]/route.ts
│   │   └── no-clones/
│   │       ├── route.ts
│   │       └── [id]/route.ts
│   ├── houses/
│   │   ├── page.tsx
│   │   ├── new-house-dialog.tsx
│   │   ├── house-actions.tsx
│   │   └── [id]/
│   │       ├── page.tsx
│   │       ├── new-clone-dialog.tsx
│   │       └── clone-actions.tsx
│   ├── no-clones/
│   │   ├── page.tsx
│   │   ├── new-no-clone-dialog.tsx
│   │   └── no-clone-actions.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/ui/
│   ├── button.tsx
│   ├── dialog.tsx
│   ├── input.tsx
│   ├── label.tsx
│   ├── textarea.tsx
│   ├── table.tsx
│   ├── alert-dialog.tsx
│   ├── toast.tsx
│   └── toaster.tsx
├── hooks/
│   └── use-toast.ts
├── lib/
│   ├── db.ts
│   ├── validations.ts
│   └── utils.ts
├── prisma/
│   └── schema.prisma
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── .env.example
```

## Instalação

### 1. Clone o repositório

```bash
cd bet-clones
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o Banco de Dados

Crie um arquivo `.env` na raiz do projeto:

```bash
cp .env.example .env
```

Edite o arquivo `.env` e configure sua URL do PostgreSQL:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/clones"
```

**Exemplo de configuração local:**

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/bet_clones"
```

### 4. Configure o PostgreSQL

Certifique-se de que o PostgreSQL está instalado e rodando.

**macOS (usando Homebrew):**
```bash
brew install postgresql@15
brew services start postgresql@15
```

**Ubuntu/Debian:**
```bash
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql
```

**Windows:**
- Baixe e instale do site oficial: https://www.postgresql.org/download/windows/

### 5. Crie o banco de dados

```bash
# Acesse o PostgreSQL
psql -U postgres

# Crie o banco
CREATE DATABASE bet_clones;

# Saia do psql
\q
```

### 6. Execute as migrações do Prisma

```bash
npx prisma migrate dev --name init
```

### 7. Gere o Prisma Client

```bash
npx prisma generate
```

## Comandos Disponíveis

### Desenvolvimento

```bash
npm run dev
```

Inicia o servidor de desenvolvimento em http://localhost:3000

### Build

```bash
npm run build
```

Cria a versão de produção otimizada.

### Produção

```bash
npm run start
```

Inicia o servidor em modo de produção.

### Prisma

```bash
# Executar migrações
npm run db:migrate

# Gerar Prisma Client
npm run db:generate

# Abrir Prisma Studio (interface visual do banco)
npm run db:studio

# Push schema sem criar migração (dev)
npm run db:push
```

### Lint

```bash
npm run lint
```

## API Routes

### Houses (Casas de Apostas)

**GET** `/api/houses`
- Lista todas as casas de apostas
- Retorna contagem de clones para cada casa

**POST** `/api/houses`
- Cria uma nova casa
- Body: `{ name: string }`

**GET** `/api/houses/[id]`
- Busca uma casa específica com seus clones

**PUT** `/api/houses/[id]`
- Atualiza uma casa
- Body: `{ name: string }`

**DELETE** `/api/houses/[id]`
- Deleta uma casa e todos os seus clones

### Clones

**POST** `/api/houses/[id]/clones`
- Cria um clone para uma casa
- Body: `{ name: string, url: string, notes?: string }`

**PUT** `/api/clones/[id]`
- Atualiza um clone
- Body: `{ name: string, url: string, notes?: string }`

**DELETE** `/api/clones/[id]`
- Deleta um clone

### No-Clone Houses (Casas sem Clones)

**GET** `/api/no-clones`
- Lista todas as casas sem clones

**POST** `/api/no-clones`
- Cria um registro de casa sem clone
- Body: `{ name: string }`

**DELETE** `/api/no-clones/[id]`
- Deleta um registro de casa sem clone

## Modelos do Banco de Dados

### House (Casa de Apostas)
```prisma
model House {
  id        String   @id @default(cuid())
  name      String   @unique
  clones    Clone[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Clone
```prisma
model Clone {
  id        String   @id @default(cuid())
  houseId   String
  name      String
  url       String
  notes     String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  house     House    @relation(fields: [houseId], references: [id], onDelete: Cascade)
}
```

### NoCloneHouse (Casa sem Clones)
```prisma
model NoCloneHouse {
  id        String   @id @default(cuid())
  name      String   @unique
  createdAt DateTime @default(now())
}
```

## Páginas

- `/` - Página inicial com links para as funcionalidades
- `/houses` - Listagem de casas de apostas
- `/houses/[id]` - Detalhes de uma casa e gestão de clones
- `/no-clones` - Listagem de casas sem clones

## Validações

Todas as rotas utilizam validação Zod:

- **Nome**: mínimo 1 caractere, máximo 100
- **URL**: deve ser uma URL válida
- **Notas**: opcional, máximo 500 caracteres

## Funcionalidades da Interface

### Casas de Apostas
- ✅ Adicionar nova casa (modal)
- ✅ Editar casa (modal)
- ✅ Deletar casa (confirmação)
- ✅ Ver clones da casa
- ✅ Contador de clones

### Clones
- ✅ Adicionar clone (modal)
- ✅ Editar clone (modal)
- ✅ Deletar clone (confirmação)
- ✅ Link externo para URL do clone
- ✅ Campo de notas opcional

### Casas sem Clones
- ✅ Adicionar registro (modal)
- ✅ Deletar registro (confirmação)

## Tecnologias de UI

### shadcn/ui Componentes Utilizados
- Button
- Dialog
- AlertDialog
- Input
- Label
- Textarea
- Table
- Toast/Toaster

### Feedback Visual
- Toasts de sucesso/erro
- Modais de confirmação
- Estados de loading
- Mensagens de validação

## Troubleshooting

### Erro de conexão com PostgreSQL
```bash
# Verifique se o PostgreSQL está rodando
pg_isready

# Ou no macOS/Linux
sudo systemctl status postgresql
```

### Erro no Prisma Client
```bash
# Regenere o client
npx prisma generate

# Resete o banco (ATENÇÃO: apaga todos os dados)
npx prisma migrate reset
```

### Porta 3000 em uso
```bash
# Use outra porta
PORT=3001 npm run dev
```

## Próximos Passos (Opcional)

- [ ] Autenticação de usuários
- [ ] Filtros e busca
- [ ] Paginação
- [ ] Export para CSV/Excel
- [ ] Dashboard com estatísticas
- [ ] Dark mode
- [ ] Testes automatizados

## Licença

MIT

## Autor

Desenvolvido como projeto de estudo Full-Stack.
