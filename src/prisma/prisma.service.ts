import 'dotenv/config';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const databaseUrl = process.env.DATABASE_URL;

    if (!databaseUrl) {
      throw new Error('DATABASE_URL não definida no arquivo .env');
    }

    // Em algumas versões do adapter a chave é "url" em vez de "connectionString".
    const adapter = new PrismaPg({ connectionString: databaseUrl });

    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
