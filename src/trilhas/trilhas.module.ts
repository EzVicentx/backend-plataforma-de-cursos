import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { TrilhasController } from './trilhas.controller';
import { TrilhasService } from './trilhas.service';

@Module({
  imports: [PrismaModule],
  controllers: [TrilhasController],
  providers: [TrilhasService],
})
export class TrilhasModule {}
