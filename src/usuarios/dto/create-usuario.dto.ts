import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUsuarioDto {
  // O front-end envia o próprio id (ex.: "usr-1a2b3c").
  // Se não vier nada, o Prisma gera um cuid automaticamente.
  @ApiPropertyOptional({ example: 'usr-1', description: 'Id opcional enviado pelo cliente' })
  @IsOptional()
  @IsString()
  id?: string;

  @ApiProperty({ example: 'Enzo Vicente', description: 'Nome completo do usuário' })
  @IsString()
  @IsNotEmpty()
  nomeCompleto: string;

  @ApiProperty({ example: 'enzo@gmail.com', description: 'E-mail único do usuário' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'hash-demo-002', description: 'Hash da senha' })
  @IsString()
  @IsNotEmpty()
  senhaHash: string;

  @ApiProperty({ example: '2026-05-18', description: 'Data de cadastro (YYYY-MM-DD)' })
  @IsDateString()
  dataCadastro: string;
}
