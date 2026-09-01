import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreatePagamentoDto {
  // O front-end envia o próprio id (ex.: "cur-1a2b3c", "usr-9f8e7d").
  // Se não vier nada, o Prisma gera um cuid automaticamente.
  @IsOptional()
  @IsString()
  id?: string;

  @IsString()
  @IsNotEmpty()
  assinaturaId: string;

  @IsNumber()
  @Min(0)
  valorPago: number;

  @IsDateString()
  dataPagamento: string;

  @IsString()
  @IsNotEmpty()
  metodoPagamento: string;

  @IsString()
  @IsNotEmpty()
  idTransacaoGateway: string;
}
