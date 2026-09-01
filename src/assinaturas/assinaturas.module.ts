import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { AssinaturasController } from './assinaturas.controller';
import { AssinaturasService } from './assinaturas.service';

@Module({
  imports: [PrismaModule],
  controllers: [AssinaturasController],
  providers: [AssinaturasService],
})
export class AssinaturasModule {}
