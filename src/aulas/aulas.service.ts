import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAulaDto } from './dto/create-aula.dto';
import { UpdateAulaDto } from './dto/update-aula.dto';

@Injectable()
export class AulasService {
  constructor(private readonly prisma: PrismaService) {}

  create(createAulaDto: CreateAulaDto) {
    return this.prisma.aula.create({ data: createAulaDto });
  }

  findAll() {
    return this.prisma.aula.findMany({ orderBy: { ordem: 'asc' } });
  }

  async findOne(id: string) {
    const registro = await this.prisma.aula.findUnique({ where: { id } });

    if (!registro) {
      throw new NotFoundException(`Registro de aula com id ${id} não encontrado`);
    }

    return registro;
  }

  async update(id: string, updateAulaDto: UpdateAulaDto) {
    await this.findOne(id);

    // O front envia o objeto inteiro (com id) no PUT; o id da rota é o que vale.
    const { id: _ignorado, ...dados } = updateAulaDto;

    return this.prisma.aula.update({ where: { id }, data: dados });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.aula.delete({ where: { id } });
  }
}
