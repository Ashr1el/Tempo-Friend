# Tempo Friend

Plataforma de conversas de companhia — agendamento gratuito de conversas individuais de 15 minutos com um anfitrião.

## 📋 Visão Geral

- **Público**: Maiores de 18 anos, Brasil
- **Modelo**: Conversas gratuitas, agendadas, sujeitas à aceitação do anfitrião
- **Duração**: 15 min + extensão opcional de 15 min (mediante pedido e aprovação)
- **Modalidade**: Chat de texto (MVP) — áudio/STT/TTS em fase posterior
- **Histórico**: 30 dias, exclusão individual/total pelo participante
- **Doações**: PIX opcional pós-sessão (fase posterior, sujeito a validação jurídica/tributária)
- **Operação**: Pessoa física com marca pública

## 🛠 Stack Tecnológica

| Camada | Tecnologia |
|--------|------------|
| Frontend | Next.js 14 (App Router) + TypeScript + React 19 |
| Estilização | Tailwind CSS v4 |
| Autenticação | Supabase Auth |
| Banco de Dados | PostgreSQL (Supabase) + RLS |
| Real-time | Supabase Realtime |
| E-mail | Resend |
| Deploy | Vercel |
| Package Manager | pnpm |

## 📁 Estrutura do Projeto

```
Tempo Friend/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API Routes
│   │   ├── auth/              # Páginas de autenticação
│   │   ├── agenda/            # Agenda de horários
│   │   ├── painel/            # Dashboard do participante
│   │   ├── sessao/[id]/       # Sala de conversa
│   │   ├── termos/            # Termos de Uso
│   │   ├── privacidade/       # Política de Privacidade
│   │   ├── regras/            # Regras da Comunidade
│   │   └── sobre/             # Sobre o projeto
│   ├── components/
│   │   └── ui/                # Componentes base (Button, Input, Card, etc.)
│   ├── lib/
│   │   ├── supabase/          # Clients Supabase (client, server, service)
│   │   ├── actions/           # Server Actions
│   │   ├── utils.ts           # Utilitários (cn, formatação, etc.)
│   │   ├── constants.ts       # Constantes da aplicação
│   │   ├── auth.ts            # Helpers de autenticação
│   │   └── email.ts           # Templates de e-mail
│   ├── hooks/                 # Custom hooks
│   ├── types/                 # TypeScript types
│   └── styles/                # Estilos globais
├── supabase/
│   └── migrations/            # Migrations SQL
├── public/                    # Assets estáticos
├── .env.example               # Exemplo de variáveis de ambiente
├── .env.local                 # Variáveis locais (não commitado)
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.ts
├── postcss.config.mjs
├── .eslintrc.json
├── .prettierrc
└── .gitignore
```

## 🚀 Como Começar

### Pré-requisitos

- Node.js 18+
- pnpm 9+
- Conta no [Supabase](https://supabase.com)
- Conta no [Resend](https://resend.com) (para e-mails)
- Conta na [Vercel](https://vercel.com) (para deploy)

### Instalação

```bash
# Clone o repositório
cd "Tempo Friend"

# Instale dependências
pnpm install

# Configure variáveis de ambiente
cp .env.example .env.local
# Edite .env.local com suas credenciais
```

### Variáveis de Ambiente

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Resend
RESEND_API_KEY=re_xxxxx
EMAIL_FROM=noreply@seudominio.com

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME="Tempo Friend"
NEXT_PUBLIC_TIMEZONE=America/Sao_Paulo
NEXT_PUBLIC_HOST_USER_ID=uuid_do_anfitriao

# Feature flags
NEXT_PUBLIC_ENABLE_AUDIO=false
NEXT_PUBLIC_ENABLE_DONATIONS=false
```

### Banco de Dados

1. Crie um projeto no Supabase
2. Execute a migration em `supabase/migrations/001_initial_schema.sql` no SQL Editor
3. Configure Authentication → Providers → Email (habilite confirmação de e-mail)
4. Configure RLS policies (já incluídas na migration)

### Desenvolvimento

```bash
pnpm dev
# Abre em http://localhost:3000
```

### Build e Deploy

```bash
pnpm build
pnpm start
```

Deploy na Vercel: conecte o repositório, adicione as variáveis de ambiente e deploy automático.

## 📚 Documentação do Projeto

- `schema_inicial.md` — Schema SQL comentado
- `roadmap.md` — Roadmap completo do produto
- `especificacao_funcional_juridica.md` — Especificação funcional e jurídica
- `arquitetura_tecnica_banco_de_dados.md` — Arquitetura técnica detalhada

## ⚖️ Aspectos Jurídicos (IMPORTANTE)

Antes de lançar publicamente:

- [ ] Advogado revisar Termos de Uso (`/termos`)
- [ ] Advogado revisar Política de Privacidade (`/privacidade`)
- [ ] Advogado avaliar CDC, Marco Civil, LGPD no modelo concreto
- [ ] Contador avaliar doações PIX recebidas por pessoa física (ITCMD, IRPF)
- [ ] Definir se operação como pessoa física continua adequada
- [ ] Validar mecanismo de verificação de maioridade
- [ ] Validar nome exibido pelo PIX (privacidade do responsável)

## 🔒 Segurança

- RLS em todas as tabelas
- MFA obrigatório para anfitrião
- Rate limiting em auth, booking, messages
- Logs sem conteúdo sensível
- Criptografia em trânsito (TLS) e em repouso
- Backups testados

## 📝 Licença

Projeto proprietário. Todos os direitos reservados.

---

**Tempo Friend** — Conversas de companhia, simples e gratuitas.