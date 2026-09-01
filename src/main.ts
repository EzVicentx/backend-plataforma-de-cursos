import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { PrismaExceptionFilter } from './common/filters/prisma-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Libera o front (Vite roda em http://localhost:5173)
  app.enableCors();

  // Valida os DTOs e remove campos que não estão declarados
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // Converte erros do Prisma (email duplicado, registro inexistente...) em respostas HTTP
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaExceptionFilter(httpAdapter));

  const config = new DocumentBuilder()
    .setTitle('Plataforma de Cursos API')
    .setDescription('API REST da Plataforma de Cursos - NestJS + Prisma + PostgreSQL')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // 3001 é a porta que o front-end já usa por padrão
  const porta = process.env.PORT ?? 3001;
  await app.listen(porta);

  console.log(`API rodando em: http://localhost:${porta}`);
  console.log(`Swagger em:     http://localhost:${porta}/api`);
}

void bootstrap();
