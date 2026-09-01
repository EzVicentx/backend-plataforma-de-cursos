import {
  ArgumentsHost,
  Catch,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';

type ErroPrisma = { code: string; meta?: Record<string, unknown> };

function ehErroDoPrisma(erro: unknown): erro is ErroPrisma {
  return (
    typeof erro === 'object' &&
    erro !== null &&
    'code' in erro &&
    typeof (erro as ErroPrisma).code === 'string' &&
    /^P\d{4}$/.test((erro as ErroPrisma).code)
  );
}

/**
 * Traduz os erros do Prisma para respostas HTTP amigáveis
 * em vez de devolver 500 para o front-end.
 */
@Catch()
export class PrismaExceptionFilter extends BaseExceptionFilter {
  private readonly logger = new Logger(PrismaExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    if (!ehErroDoPrisma(exception)) {
      return super.catch(exception, host);
    }

    const resposta = host.switchToHttp().getResponse<Response>();
    this.logger.warn(`Erro do Prisma ${exception.code}`);

    switch (exception.code) {
      case 'P2002': {
        const campos = (exception.meta?.target as string[] | undefined) ?? [];
        return resposta.status(HttpStatus.CONFLICT).json({
          statusCode: HttpStatus.CONFLICT,
          message: `Já existe um registro com esse valor único${
            campos.length ? `: ${campos.join(', ')}` : ''
          }.`,
          error: 'Conflict',
        });
      }

      case 'P2003':
        return resposta.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.BAD_REQUEST,
          message:
            'Referência inválida: o registro relacionado informado não existe.',
          error: 'Bad Request',
        });

      case 'P2025':
        return resposta.status(HttpStatus.NOT_FOUND).json({
          statusCode: HttpStatus.NOT_FOUND,
          message: 'Registro não encontrado.',
          error: 'Not Found',
        });

      default:
        return super.catch(exception, host);
    }
  }
}
