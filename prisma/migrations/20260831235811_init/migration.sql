-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL,
    "nomeCompleto" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senhaHash" TEXT NOT NULL,
    "dataCadastro" TEXT NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categorias" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "categorias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cursos" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "instrutorId" TEXT NOT NULL,
    "categoriaId" TEXT NOT NULL,
    "nivel" TEXT NOT NULL,
    "dataPublicacao" TEXT NOT NULL,
    "totalAulas" INTEGER NOT NULL,
    "totalHoras" INTEGER NOT NULL,

    CONSTRAINT "cursos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "modulos" (
    "id" TEXT NOT NULL,
    "cursoId" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "ordem" INTEGER NOT NULL,

    CONSTRAINT "modulos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "aulas" (
    "id" TEXT NOT NULL,
    "moduloId" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "tipoConteudo" TEXT NOT NULL,
    "urlConteudo" TEXT NOT NULL,
    "duracaoMinutos" INTEGER NOT NULL,
    "ordem" INTEGER NOT NULL,

    CONSTRAINT "aulas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "matriculas" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "cursoId" TEXT NOT NULL,
    "dataMatricula" TEXT NOT NULL,
    "dataConclusao" TEXT,

    CONSTRAINT "matriculas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "progresso_aulas" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "aulaId" TEXT NOT NULL,
    "dataConclusao" TEXT,
    "status" TEXT NOT NULL,

    CONSTRAINT "progresso_aulas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "avaliacoes" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "cursoId" TEXT NOT NULL,
    "nota" INTEGER NOT NULL,
    "comentario" TEXT NOT NULL,
    "dataAvaliacao" TEXT NOT NULL,

    CONSTRAINT "avaliacoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trilhas" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "categoriaId" TEXT NOT NULL,

    CONSTRAINT "trilhas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "trilhas_cursos" (
    "id" TEXT NOT NULL,
    "trilhaId" TEXT NOT NULL,
    "cursoId" TEXT NOT NULL,
    "ordem" INTEGER NOT NULL,

    CONSTRAINT "trilhas_cursos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "certificados" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "cursoId" TEXT NOT NULL,
    "trilhaId" TEXT,
    "codigoVerificacao" TEXT NOT NULL,
    "dataEmissao" TEXT NOT NULL,

    CONSTRAINT "certificados_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "planos" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "preco" DOUBLE PRECISION NOT NULL,
    "duracaoMeses" INTEGER NOT NULL,

    CONSTRAINT "planos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assinaturas" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "planoId" TEXT NOT NULL,
    "dataInicio" TEXT NOT NULL,
    "dataFim" TEXT NOT NULL,

    CONSTRAINT "assinaturas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pagamentos" (
    "id" TEXT NOT NULL,
    "assinaturaId" TEXT NOT NULL,
    "valorPago" DOUBLE PRECISION NOT NULL,
    "dataPagamento" TEXT NOT NULL,
    "metodoPagamento" TEXT NOT NULL,
    "idTransacaoGateway" TEXT NOT NULL,

    CONSTRAINT "pagamentos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE INDEX "cursos_instrutorId_idx" ON "cursos"("instrutorId");

-- CreateIndex
CREATE INDEX "cursos_categoriaId_idx" ON "cursos"("categoriaId");

-- CreateIndex
CREATE INDEX "modulos_cursoId_idx" ON "modulos"("cursoId");

-- CreateIndex
CREATE INDEX "aulas_moduloId_idx" ON "aulas"("moduloId");

-- CreateIndex
CREATE UNIQUE INDEX "matriculas_usuarioId_cursoId_key" ON "matriculas"("usuarioId", "cursoId");

-- CreateIndex
CREATE UNIQUE INDEX "progresso_aulas_usuarioId_aulaId_key" ON "progresso_aulas"("usuarioId", "aulaId");

-- CreateIndex
CREATE INDEX "avaliacoes_cursoId_idx" ON "avaliacoes"("cursoId");

-- CreateIndex
CREATE INDEX "trilhas_categoriaId_idx" ON "trilhas"("categoriaId");

-- CreateIndex
CREATE UNIQUE INDEX "trilhas_cursos_trilhaId_cursoId_key" ON "trilhas_cursos"("trilhaId", "cursoId");

-- CreateIndex
CREATE UNIQUE INDEX "certificados_codigoVerificacao_key" ON "certificados"("codigoVerificacao");

-- CreateIndex
CREATE INDEX "certificados_usuarioId_idx" ON "certificados"("usuarioId");

-- CreateIndex
CREATE INDEX "assinaturas_usuarioId_idx" ON "assinaturas"("usuarioId");

-- CreateIndex
CREATE INDEX "pagamentos_assinaturaId_idx" ON "pagamentos"("assinaturaId");

-- AddForeignKey
ALTER TABLE "cursos" ADD CONSTRAINT "cursos_instrutorId_fkey" FOREIGN KEY ("instrutorId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cursos" ADD CONSTRAINT "cursos_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "categorias"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "modulos" ADD CONSTRAINT "modulos_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "cursos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aulas" ADD CONSTRAINT "aulas_moduloId_fkey" FOREIGN KEY ("moduloId") REFERENCES "modulos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matriculas" ADD CONSTRAINT "matriculas_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "matriculas" ADD CONSTRAINT "matriculas_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "cursos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "progresso_aulas" ADD CONSTRAINT "progresso_aulas_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "progresso_aulas" ADD CONSTRAINT "progresso_aulas_aulaId_fkey" FOREIGN KEY ("aulaId") REFERENCES "aulas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "avaliacoes" ADD CONSTRAINT "avaliacoes_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "avaliacoes" ADD CONSTRAINT "avaliacoes_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "cursos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trilhas" ADD CONSTRAINT "trilhas_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "categorias"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trilhas_cursos" ADD CONSTRAINT "trilhas_cursos_trilhaId_fkey" FOREIGN KEY ("trilhaId") REFERENCES "trilhas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trilhas_cursos" ADD CONSTRAINT "trilhas_cursos_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "cursos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "certificados" ADD CONSTRAINT "certificados_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "certificados" ADD CONSTRAINT "certificados_cursoId_fkey" FOREIGN KEY ("cursoId") REFERENCES "cursos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "certificados" ADD CONSTRAINT "certificados_trilhaId_fkey" FOREIGN KEY ("trilhaId") REFERENCES "trilhas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assinaturas" ADD CONSTRAINT "assinaturas_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "usuarios"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assinaturas" ADD CONSTRAINT "assinaturas_planoId_fkey" FOREIGN KEY ("planoId") REFERENCES "planos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pagamentos" ADD CONSTRAINT "pagamentos_assinaturaId_fkey" FOREIGN KEY ("assinaturaId") REFERENCES "assinaturas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
