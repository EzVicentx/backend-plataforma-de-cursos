import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Limpando as tabelas...');
  await prisma.pagamento.deleteMany();
  await prisma.assinatura.deleteMany();
  await prisma.plano.deleteMany();
  await prisma.certificado.deleteMany();
  await prisma.trilhaCurso.deleteMany();
  await prisma.trilha.deleteMany();
  await prisma.avaliacao.deleteMany();
  await prisma.progressoAula.deleteMany();
  await prisma.matricula.deleteMany();
  await prisma.aula.deleteMany();
  await prisma.modulo.deleteMany();
  await prisma.curso.deleteMany();
  await prisma.categoria.deleteMany();
  await prisma.usuario.deleteMany();

  console.log('Inserindo os dados iniciais (mesmos do db.json)...');

  await prisma.usuario.createMany({
    data: [
      {
        id: 'usr-1',
        nomeCompleto: 'Daniel Costa',
        email: 'daniel@gmail.com',
        senhaHash: 'hash-demo-001',
        dataCadastro: '2026-05-10',
      },
      {
        id: 'usr-2',
        nomeCompleto: 'Enzo Vicente',
        email: 'enzo@gmail.com',
        senhaHash: 'hash-demo-002',
        dataCadastro: '2026-05-18',
      },
    ],
  });

  await prisma.categoria.createMany({
    data: [
      {
        id: 'cat-1',
        nome: 'Desenvolvimento Web',
        descricao: 'Front-end, back-end e fundamentos para produtos digitais.',
      },
      {
        id: 'cat-2',
        nome: 'Dados e IA',
        descricao: 'Analise de dados, automacao e inteligencia artificial aplicada.',
      },
    ],
  });

  await prisma.curso.createMany({
    data: [
      {
        id: 'cur-1',
        titulo: 'React Essencial',
        descricao: 'Componentes, hooks, rotas e consumo de APIs em aplicacoes modernas.',
        instrutorId: 'usr-2',
        categoriaId: 'cat-1',
        nivel: 'Iniciante',
        dataPublicacao: '2026-05-20',
        totalAulas: 8,
        totalHoras: 6,
      },
      {
        id: 'cur-2',
        titulo: 'APIs com Node',
        descricao: 'Criacao de servicos REST, persistencia e integracao com front-end.',
        instrutorId: 'usr-2',
        categoriaId: 'cat-1',
        nivel: 'Intermediario',
        dataPublicacao: '2026-05-22',
        totalAulas: 10,
        totalHoras: 8,
      },
      {
        id: 'cur-3',
        titulo: 'Fundamentos de Dados',
        descricao: 'Modelagem, consultas e visualizacao para tomada de decisao.',
        instrutorId: 'usr-1',
        categoriaId: 'cat-2',
        nivel: 'Iniciante',
        dataPublicacao: '2026-05-28',
        totalAulas: 7,
        totalHoras: 5,
      },
    ],
  });

  await prisma.modulo.createMany({
    data: [
      {
        id: 'mod-1',
        cursoId: 'cur-1',
        titulo: 'Base do React',
        ordem: 1,
      },
      {
        id: 'mod-2',
        cursoId: 'cur-1',
        titulo: 'Rotas e API',
        ordem: 2,
      },
      {
        id: 'mod-3',
        cursoId: 'cur-2',
        titulo: 'REST na pratica',
        ordem: 1,
      },
      {
        id: 'mod-4',
        cursoId: 'cur-3',
        titulo: 'Dados para produto',
        ordem: 1,
      },
    ],
  });

  await prisma.aula.createMany({
    data: [
      {
        id: 'aul-1',
        moduloId: 'mod-1',
        titulo: 'Criando componentes',
        tipoConteudo: 'Video',
        urlConteudo: 'https://exemplo.com/aulas/componentes',
        duracaoMinutos: 35,
        ordem: 1,
      },
      {
        id: 'aul-2',
        moduloId: 'mod-1',
        titulo: 'Estado e eventos',
        tipoConteudo: 'Texto',
        urlConteudo: 'https://exemplo.com/aulas/estado',
        duracaoMinutos: 28,
        ordem: 2,
      },
      {
        id: 'aul-3',
        moduloId: 'mod-2',
        titulo: 'Consumindo JSON Server',
        tipoConteudo: 'Video',
        urlConteudo: 'https://exemplo.com/aulas/json-server',
        duracaoMinutos: 42,
        ordem: 1,
      },
      {
        id: 'aul-4',
        moduloId: 'mod-3',
        titulo: 'Desenhando endpoints',
        tipoConteudo: 'Quiz',
        urlConteudo: 'https://exemplo.com/aulas/endpoints',
        duracaoMinutos: 20,
        ordem: 1,
      },
    ],
  });

  await prisma.matricula.createMany({
    data: [
      {
        id: 'mat-1',
        usuarioId: 'usr-1',
        cursoId: 'cur-1',
        dataMatricula: '2026-06-01',
        dataConclusao: null,
      },
    ],
  });

  await prisma.progressoAula.createMany({
    data: [
      {
        id: 'prog-1',
        usuarioId: 'usr-1',
        aulaId: 'aul-1',
        dataConclusao: '2026-06-02',
        status: 'Concluido',
      },
    ],
  });

  await prisma.avaliacao.createMany({
    data: [
      {
        id: 'ava-1',
        usuarioId: 'usr-1',
        cursoId: 'cur-1',
        nota: 5,
        comentario: 'Curso direto ao ponto e muito bem organizado.',
        dataAvaliacao: '2026-06-03',
      },
    ],
  });

  await prisma.trilha.createMany({
    data: [
      {
        id: 'tri-1',
        titulo: 'Formacao Front-end',
        descricao: 'Sequencia indicada para iniciar em desenvolvimento de interfaces.',
        categoriaId: 'cat-1',
      },
    ],
  });

  await prisma.trilhaCurso.createMany({
    data: [
      {
        id: 'tc-1',
        trilhaId: 'tri-1',
        cursoId: 'cur-1',
        ordem: 1,
      },
      {
        id: 'tc-2',
        trilhaId: 'tri-1',
        cursoId: 'cur-2',
        ordem: 2,
      },
    ],
  });

  await prisma.certificado.createMany({
    data: [
      {
        id: 'cer-1',
        usuarioId: 'usr-1',
        cursoId: 'cur-1',
        trilhaId: null,
        codigoVerificacao: 'CERT-REACT-2026-001',
        dataEmissao: '2026-06-04',
      },
    ],
  });

  await prisma.plano.createMany({
    data: [
      {
        id: 'pla-1',
        nome: 'Mensal',
        descricao: 'Acesso completo por 30 dias.',
        preco: 59.9,
        duracaoMeses: 1,
      },
      {
        id: 'pla-2',
        nome: 'Anual',
        descricao: 'Acesso completo por 12 meses com melhor custo-beneficio.',
        preco: 499.9,
        duracaoMeses: 12,
      },
    ],
  });

  await prisma.assinatura.createMany({
    data: [
      {
        id: 'ass-1',
        usuarioId: 'usr-1',
        planoId: 'pla-1',
        dataInicio: '2026-06-01',
        dataFim: '2026-07-01',
      },
    ],
  });

  await prisma.pagamento.createMany({
    data: [
      {
        id: 'pag-1',
        assinaturaId: 'ass-1',
        valorPago: 59.9,
        dataPagamento: '2026-06-01',
        metodoPagamento: 'Cartao de credito',
        idTransacaoGateway: 'TX-20260601-001',
      },
    ],
  });

  console.log('Seed concluido com sucesso.');
}

main()
  .catch((erro) => {
    console.error(erro);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
