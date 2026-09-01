import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAvaliacaoDto } from './dto/create-avaliacao.dto';
import { UpdateAvaliacaoDto } from './dto/update-avaliacao.dto';

@Injectable()
export class AvaliacoesService {
  constructor(private readonly prisma: PrismaService) {}

  create(createAvaliacaoDto: CreateAvaliacaoDto) {
    return this.prisma.avaliacao.create({ data: createAvaliacaoDto });
  }

  findAll() {
    return this.prisma.avaliacao.findMany();
  }

  async findOne(id: string) {
    const registro = await this.prisma.avaliacao.findUnique({ where: { id } });

    if (!registro) {
      throw new NotFoundException(`Registro de avaliação com id ${id} não encontrado`);
    }

    return registro;
  }

  async update(id: string, updateAvaliacaoDto: UpdateAvaliacaoDto) {
    await this.findOne(id);

    // O front envia o objeto inteiro (com id) no PUT; o id da rota é o que vale.
    const { id: _ignorado, ...dados } = updateAvaliacaoDto;

    return this.prisma.avaliacao.update({ where: { id }, data: dados });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.avaliacao.delete({ where: { id } });
  }
}
