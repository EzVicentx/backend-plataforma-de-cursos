import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PlanosController } from './planos.controller';
import { PlanosService } from './planos.service';

@Module({
  imports: [PrismaModule],
  controllers: [PlanosController],
  providers: [PlanosService],
})
export class PlanosModule {}
