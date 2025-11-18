# 🚀 Deploy na Vercel

## Passo 1: Configurar Banco de Dados PostgreSQL

Você precisa de um banco PostgreSQL em produção. Recomendações:

### Opção 1: Neon (Grátis) ⭐ Recomendado
1. Acesse: https://neon.tech
2. Crie uma conta gratuita
3. Crie um novo projeto
4. Copie a **Connection String**

### Opção 2: Supabase (Grátis)
1. Acesse: https://supabase.com
2. Crie uma conta e um novo projeto
3. Vá em **Settings > Database**
4. Copie a **Connection String** (modo Pooler)

### Opção 3: Railway
1. Acesse: https://railway.app
2. Crie um PostgreSQL database
3. Copie a **DATABASE_URL**

---

## Passo 2: Deploy na Vercel

### Via Interface Web (Mais Fácil)

1. Acesse: https://vercel.com
2. Faça login com GitHub
3. Clique em **"Add New Project"**
4. Importe este repositório
5. Configure as **Environment Variables**:
   ```
   DATABASE_URL=sua_connection_string_aqui
   ```
6. Clique em **Deploy**

### Via CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Fazer login
vercel login

# Deploy
vercel

# Seguir as instruções e adicionar a variável:
# DATABASE_URL=sua_connection_string_aqui
```

---

## Passo 3: Configurar Variáveis de Ambiente

Na Vercel, vá em:
**Settings > Environment Variables**

Adicione:

| Name | Value |
|------|-------|
| `DATABASE_URL` | Sua connection string do PostgreSQL |

**Importante:** Marque todas as opções:
- ✅ Production
- ✅ Preview
- ✅ Development

---

## Passo 4: Executar Migrações

Após o primeiro deploy, execute as migrações:

```bash
# Via Vercel CLI
vercel env pull .env.production
npx prisma migrate deploy
```

Ou configure o **Build Command** na Vercel:

```bash
prisma generate && prisma migrate deploy && next build
```

---

## Passo 5: Popular o Banco (Seed) - Opcional

Para popular o banco com dados de exemplo:

```bash
# Localmente com a URL de produção
DATABASE_URL="sua_url_producao" npx prisma db seed
```

---

## 🔧 Configurações Importantes

### Build Settings na Vercel

- **Framework Preset:** Next.js
- **Build Command:** `prisma generate && next build`
- **Install Command:** `pnpm install`
- **Output Directory:** `.next`
- **Node Version:** 18.x ou superior

### Domínio Personalizado (Opcional)

1. Vá em **Settings > Domains**
2. Adicione seu domínio
3. Configure os DNS conforme instruído

---

## 🐛 Troubleshooting

### Erro: "Can't reach database server"
- Verifique se a `DATABASE_URL` está correta
- Certifique-se que o banco está acessível publicamente
- No Neon/Supabase, use a connection string com pooling

### Erro: "Prisma Client not generated"
- Adicione `prisma generate` ao build command
- Build Command: `prisma generate && next build`

### Erro: "Table does not exist"
- Execute as migrações: `npx prisma migrate deploy`
- Ou configure script de build: `prisma migrate deploy && next build`

### Build muito lento
- Use pnpm ao invés de npm
- Install Command: `pnpm install`

---

## 📊 Monitoramento

- **Analytics:** Vercel Analytics (automático)
- **Logs:** Vercel Dashboard > Logs
- **Database:** Use Prisma Studio localmente
  ```bash
  DATABASE_URL="sua_url_producao" npx prisma studio
  ```

---

## 🔄 Atualizações Automáticas

A Vercel irá automaticamente fazer deploy quando você:
- Fizer push para a branch `main` (produção)
- Criar um Pull Request (preview)

---

## 📝 Checklist Pré-Deploy

- [ ] Banco PostgreSQL configurado
- [ ] `DATABASE_URL` adicionada nas env vars da Vercel
- [ ] Build command inclui `prisma generate`
- [ ] Migrações executadas
- [ ] Testado localmente com `pnpm build`
- [ ] `.env` não está no repositório (use `.gitignore`)

---

## 🎯 URLs Úteis

- **Vercel Dashboard:** https://vercel.com/dashboard
- **Neon (DB):** https://neon.tech
- **Documentação Next.js:** https://nextjs.org/docs/deployment
- **Documentação Prisma:** https://www.prisma.io/docs/guides/deployment

---

**🚀 Pronto! Seu app estará no ar em poucos minutos!**
