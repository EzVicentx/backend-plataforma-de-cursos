import { IsDateString, IsInt, IsNotEmpty, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateAvaliacaoDto {
  // O front-end envia o próprio id (ex.: "cur-1a2b3c", "usr-9f8e7d").
  // Se não vier nada, o Prisma gera um cuid automaticamente.
  @IsOptional()
  @IsString()
  id?: string;

  @IsString()
  @IsNotEmpty()
  usuarioId: string;

  @IsString()
  @IsNotEmpty()
  cursoId: string;

  @IsInt()
  @Min(1)
  @Max(5)
  nota: number;

  @IsString()
  comentario: string;

  @IsDateString()
  dataAvaliacao: string;
}
