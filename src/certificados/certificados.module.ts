import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { CertificadosController } from './certificados.controller';
import { CertificadosService } from './certificados.service';

@Module({
  imports: [PrismaModule],
  controllers: [CertificadosController],
  providers: [CertificadosService],
})
export class CertificadosModule {}
