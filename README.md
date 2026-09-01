# Plataforma de Cursos — API

Backend da Plataforma de Cursos, feito com NestJS e Prisma em cima de PostgreSQL.

Substitui o JSON Server que o front usava em dev. As rotas e os nomes dos campos são os mesmos,
então o front funciona sem precisar mudar nada.

Front: https://github.com/EzVicentx/Lab03N2_Plataforma_de_Cursos

## Stack

- NestJS 11
- Prisma 7 (driver adapter `@prisma/adapter-pg`)
- PostgreSQL 17
- class-validator para validação
- Swagger em `/api`

## Rodando

Precisa ter Node 20+ e um PostgreSQL rodando na 5432.

```bash
npm install
cp .env.example .env      # no Windows: copy .env.example .env
```

Ajusta a `DATABASE_URL` no `.env` com a sua senha do Postgres. Depois:

```bash
npx prisma migrate dev --name init
npx prisma generate
npx prisma db seed
npm run start:dev
```

A API sobe na 3001 (é a porta que o front espera). Swagger em http://localhost:3001/api.

O seed popula o banco com os mesmos dados que estavam no `db.json` do front, então dá pra abrir a
aplicação e já ter cursos, planos e usuários cadastrados.

## Estrutura

```
src/
├── main.ts                 bootstrap, CORS, ValidationPipe e Swagger
├── app.module.ts
├── prisma/                 PrismaService + PrismaModule (global)
├── common/filters/         converte erro do Prisma em resposta HTTP
└── <recurso>/              um módulo por entidade
    ├── *.controller.ts
    ├── *.service.ts
    └── dto/
```

Todo recurso segue o mesmo formato, então se você entendeu `cursos/` entendeu os outros treze.

## Endpoints

São 14 recursos, todos com CRUD completo:

`usuarios` · `categorias` · `cursos` · `modulos` · `aulas` · `matriculas` · `progressoAulas` ·
`avaliacoes` · `trilhas` · `trilhasCursos` · `certificados` · `planos` · `assinaturas` · `pagamentos`

| Verbo | Rota | O que faz |
| --- | --- | --- |
| GET | `/cursos` | lista tudo |
| GET | `/cursos/:id` | busca um |
| POST | `/cursos` | cria |
| PUT | `/cursos/:id` | atualiza (substitui) |
| PATCH | `/cursos/:id` | atualiza parcial |
| DELETE | `/cursos/:id` | remove |

Vale pra qualquer um dos recursos, é só trocar `cursos` pelo nome.

## Algumas decisões

**Ids são string, não int.** O front gera o id no cliente (`cur-1a2b3c`) e manda junto no POST.
Os DTOs aceitam `id` opcional; se não vier nada o Prisma gera um cuid.

**Datas são string no formato `2026-05-10`.** Com `DateTime` o Prisma devolveria
`2026-05-10T00:00:00.000Z` e o front, que só imprime o valor cru na tabela, ia mostrar isso na tela.

**PUT e PATCH fazem a mesma coisa.** O front usa PUT, o PATCH ficou porque é o que o Nest gera
por padrão e não custa nada manter.

**DELETE devolve o registro apagado em vez de 204.** O `api.ts` do front chama `response.json()`
no delete, e corpo vazio quebraria a chamada.

**As relações são todas `onDelete: Cascade`.** Sem isso, apagar um curso pela tela estouraria erro
de foreign key por causa dos módulos e matrículas pendurados nele.

**`nivel`, `tipoConteudo` e `status` são string com `@IsIn` no DTO** em vez de enum do Postgres.
A validação acontece do mesmo jeito e evita acoplar os tipos gerados do Prisma nos DTOs. Se quiser
enum de verdade é só declarar no schema e trocar por `@IsEnum`.

## Erros

O `PrismaExceptionFilter` traduz os erros do Prisma antes de sair pro cliente:

- `P2002` (unique violado) → 409
- `P2003` (foreign key inválida) → 400
- `P2025` (registro não existe) → 404

Sem isso qualquer email duplicado viraria um 500 genérico.

## Scripts

```bash
npm run start:dev        # watch mode
npm run build
npx prisma studio        # visualizar o banco no navegador
npx prisma migrate reset # zera o banco e reaplica as migrations
npx prisma db seed
```

## Detalhes chatos

O `tsconfig.build.json` exclui `prisma` e `prisma.config.ts`, senão o Nest tenta compilar esses
arquivos e a pasta `dist` sai com a estrutura errada.

Se der `Cannot find module '../generated/prisma/client'`, é porque faltou rodar `npx prisma generate`.
O client é gerado em `src/generated/` e não vai pro repositório.

Rodando junto com o front, use `npm run dev` lá e não `npm start`, que subiria o JSON Server na 3001
e brigaria com esta API pela porta.
