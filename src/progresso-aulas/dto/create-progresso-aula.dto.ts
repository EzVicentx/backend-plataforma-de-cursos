import { IsDateString, IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProgressoAulaDto {
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
  aulaId: string;

  @IsOptional()
  @IsDateString()
  dataConclusao?: string | null;

  @IsIn(['Pendente', 'Concluido'])
  status: string;
}
