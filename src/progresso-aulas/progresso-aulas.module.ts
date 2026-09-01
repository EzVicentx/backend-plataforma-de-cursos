import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ProgressoAulasController } from './progresso-aulas.controller';
import { ProgressoAulasService } from './progresso-aulas.service';

@Module({
  imports: [PrismaModule],
  controllers: [ProgressoAulasController],
  providers: [ProgressoAulasService],
})
export class ProgressoAulasModule {}
