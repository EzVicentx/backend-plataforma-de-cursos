import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreateTrilhaCursoDto {
  // O front-end envia o próprio id (ex.: "cur-1a2b3c", "usr-9f8e7d").
  // Se não vier nada, o Prisma gera um cuid automaticamente.
  @IsOptional()
  @IsString()
  id?: string;

  @IsString()
  @IsNotEmpty()
  trilhaId: string;

  @IsString()
  @IsNotEmpty()
  cursoId: string;

  @IsInt()
  @Min(1)
  ordem: number;
}
