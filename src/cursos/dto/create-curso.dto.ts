import { IsDateString, IsIn, IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreateCursoDto {
  // O front-end envia o próprio id (ex.: "cur-1a2b3c", "usr-9f8e7d").
  // Se não vier nada, o Prisma gera um cuid automaticamente.
  @IsOptional()
  @IsString()
  id?: string;

  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsString()
  descricao: string;

  @IsString()
  @IsNotEmpty()
  instrutorId: string;

  @IsString()
  @IsNotEmpty()
  categoriaId: string;

  @IsIn(['Iniciante', 'Intermediario', 'Avancado'])
  nivel: string;

  @IsDateString()
  dataPublicacao: string;

  @IsInt()
  @Min(0)
  totalAulas: number;

  @IsInt()
  @Min(0)
  totalHoras: number;
}
