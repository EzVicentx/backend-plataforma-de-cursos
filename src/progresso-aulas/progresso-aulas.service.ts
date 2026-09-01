import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProgressoAulaDto } from './dto/create-progresso-aula.dto';
import { UpdateProgressoAulaDto } from './dto/update-progresso-aula.dto';

@Injectable()
export class ProgressoAulasService {
  constructor(private readonly prisma: PrismaService) {}

  create(createProgressoAulaDto: CreateProgressoAulaDto) {
    return this.prisma.progressoAula.create({ data: createProgressoAulaDto });
  }

  findAll() {
    return this.prisma.progressoAula.findMany();
  }

  async findOne(id: string) {
    const registro = await this.prisma.progressoAula.findUnique({ where: { id } });

    if (!registro) {
      throw new NotFoundException(`Registro de progresso de aula com id ${id} não encontrado`);
    }

    return registro;
  }

  async update(id: string, updateProgressoAulaDto: UpdateProgressoAulaDto) {
    await this.findOne(id);

    // O front envia o objeto inteiro (com id) no PUT; o id da rota é o que vale.
    const { id: _ignorado, ...dados } = updateProgressoAulaDto;

    return this.prisma.progressoAula.update({ where: { id }, data: dados });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.progressoAula.delete({ where: { id } });
  }
}
