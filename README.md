# Backend - Plataforma de Cursos (NestJS + Prisma + PostgreSQL)

API REST que substitui o JSON Server do front `Lab03N2_Plataforma_de_Cursos`.
Mesmas rotas, mesmos nomes de campo, mesmos ids — o front funciona sem alterar uma linha.

**Entidades:** usuarios, categorias, cursos, modulos, aulas, matriculas, progressoAulas,
avaliacoes, trilhas, trilhasCursos, certificados, planos, assinaturas, pagamentos (14 CRUDs).

---

## 0. Pré-requisitos

Node 20+ e um PostgreSQL rodando. Se não tiver o Postgres instalado, sobe num container:

```bash
docker run --name pg-cursos \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=plataforma_cursos \
  -p 5432:5432 -d postgres:16
```

---

## 1. Criar o projeto e instalar as dependências

```bash
npm i -g @nestjs/cli
nest new backend-plataforma-de-cursos
cd backend-plataforma-de-cursos

npm install -D prisma tsx
npm install @prisma/client @prisma/adapter-pg dotenv
npm install class-validator class-transformer
npm install --save @nestjs/swagger
```

Conectar na pasta ao repositório do GitHub:

```bash
git init
git remote add origin https://github.com/EzVicentx/backend-plataforma-de-cursos.git
git branch -M main
```

---

## 2. Inicializar o Prisma

```bash
npx prisma init
```

Isso cria a pasta `prisma/`, o `prisma.config.ts` e o `.env`.

**Copie destes arquivos deste pacote:**

- `prisma/schema.prisma` → os 14 modelos com relacionamentos e cascade
- `prisma.config.ts` → aponta schema, migrations e o comando de seed

Crie o `.env` (use o `.env.example` como base):

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/plataforma_cursos?schema=public"
PORT=3001
```

Rode a migration e gere o client:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

> No Prisma 7 o `migrate dev` **não** roda mais o `generate` sozinho — por isso os dois comandos.

---

## 3. Prisma Service

```bash
nest generate module prisma
nest generate service prisma
```

Depois substitua pelos arquivos deste pacote:

- `src/prisma/prisma.service.ts` — estende `PrismaClient` usando o adapter `PrismaPg`
- `src/prisma/prisma.module.ts` — marcado como `@Global()` e com `exports: [PrismaService]`

---

## 4. Gerar os 14 recursos (CRUD)

```bash
nest g resource usuarios --no-spec
nest g resource categorias --no-spec
nest g resource cursos --no-spec
nest g resource modulos --no-spec
nest g resource aulas --no-spec
nest g resource matriculas --no-spec
nest g resource progresso-aulas --no-spec
nest g resource avaliacoes --no-spec
nest g resource trilhas --no-spec
nest g resource trilhas-cursos --no-spec
nest g resource certificados --no-spec
nest g resource planos --no-spec
nest g resource assinaturas --no-spec
nest g resource pagamentos --no-spec
```

Em cada um escolha **REST API** e responda **Yes** para gerar os entry points do CRUD.

Depois copie por cima toda a pasta `src/` deste pacote. Cada módulo tem:

```
src/cursos/
├── cursos.controller.ts     rotas HTTP (GET, POST, PUT, PATCH, DELETE)
├── cursos.module.ts         importa o PrismaModule
├── cursos.service.ts        regra de negócio + chamadas do Prisma
└── dto/
    ├── create-curso.dto.ts  validação de entrada (class-validator)
    └── update-curso.dto.ts  PartialType do create
```

E o `src/app.module.ts` já vem com os 14 módulos registrados.

---

## 5. main.ts, validação e Swagger

Copie `src/main.ts` e `src/common/filters/prisma-exception.filter.ts`. Eles ligam:

- `ValidationPipe` global com `whitelist: true`
- CORS liberado (o Vite roda em `http://localhost:5173`)
- Swagger em `http://localhost:3001/api`
- Tradução dos erros do Prisma → HTTP (P2002 = 409, P2003 = 400, P2025 = 404)

Copie também o `nest-cli.json`, que habilita o plugin do Swagger (evita ter que escrever
`@ApiProperty` em todos os campos — o Nest infere pelos tipos do TypeScript).

Ajuste o `tsconfig.build.json` para o Nest não tentar compilar a pasta do Prisma:

```json
{
  "extends": "./tsconfig.json",
  "exclude": ["node_modules", "test", "dist", "**/*spec.ts", "prisma", "prisma.config.ts"]
}
```

---

## 6. Popular o banco com os dados do db.json

Copie `prisma/seed.ts` (já tem os mesmos registros do `db.json` do front) e rode:

```bash
npx prisma db seed
```

---

## 7. Rodar e testar

```bash
npm run start:dev
```

- API: <http://localhost:3001>
- Swagger: <http://localhost:3001/api>

Testes rápidos:

```bash
curl http://localhost:3001/cursos
curl http://localhost:3001/planos

curl -X POST http://localhost:3001/categorias \
  -H "Content-Type: application/json" \
  -d '{"id":"cat-3","nome":"Mobile","descricao":"Apps Android e iOS"}'

curl -X DELETE http://localhost:3001/categorias/cat-3
```

---

## 8. Ligar no front-end

O front já aponta para `http://localhost:3001` por padrão. Só um detalhe:

```bash
# no repositório do front, rode SÓ o Vite (o npm start subiria o json-server na 3001 e daria conflito)
npm run dev
```

Se quiser deixar explícito, crie um `.env` no front:

```bash
VITE_API_URL=http://localhost:3001
```

---

## Decisões de projeto (vale citar no relatório)

| Decisão | Motivo |
| --- | --- |
| `id String @id @default(cuid())` | O front cria os ids (`cur-1a2b3c`) e envia no POST. O DTO aceita `id` opcional; sem ele o Prisma gera um cuid. |
| Datas como `String` (`"2026-05-10"`) | O front renderiza a data crua. Com `DateTime` o Prisma devolveria `2026-05-10T00:00:00.000Z` e quebraria a exibição. |
| `nivel`, `tipoConteudo`, `status` como `String` + `@IsIn(...)` | Validação garantida no DTO sem acoplar os tipos gerados do Prisma. Para virar `enum` do Postgres, é só declarar o enum no schema e trocar o `@IsIn` por `@IsEnum`. |
| `PUT` **e** `PATCH` no controller | O front usa `PUT`; o `PATCH` fica como bônus da API. |
| `DELETE` retornando o registro apagado | O front faz `response.json()` no delete — um `204 No Content` quebraria a chamada. |
| `onDelete: Cascade` nas relações | Apagar um curso pela tela não estoura erro de chave estrangeira. |
| `preco` como `Float` | O front chama `preco.toLocaleString()`; `Decimal` viria serializado como string. |

---

## Comandos úteis

```bash
npx prisma studio            # navegar no banco pelo navegador
npx prisma migrate reset     # zerar o banco e reaplicar as migrations
npx prisma db seed           # repopular os dados
npm run start:dev            # API em modo watch
```

## Publicar no GitHub

```bash
git add .
git commit -m "feat: API REST da plataforma de cursos com NestJS, Prisma e PostgreSQL"
git push -u origin main
```
