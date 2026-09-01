import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCategoriaDto {
  // O front-end envia o próprio id (ex.: "cur-1a2b3c", "usr-9f8e7d").
  // Se não vier nada, o Prisma gera um cuid automaticamente.
  @IsOptional()
  @IsString()
  id?: string;

  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsString()
  descricao: string;
}
