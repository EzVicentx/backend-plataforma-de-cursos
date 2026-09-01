import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePlanoDto } from './dto/create-plano.dto';
import { UpdatePlanoDto } from './dto/update-plano.dto';

@Injectable()
export class PlanosService {
  constructor(private readonly prisma: PrismaService) {}

  create(createPlanoDto: CreatePlanoDto) {
    return this.prisma.plano.create({ data: createPlanoDto });
  }

  findAll() {
    return this.prisma.plano.findMany();
  }

  async findOne(id: string) {
    const registro = await this.prisma.plano.findUnique({ where: { id } });

    if (!registro) {
      throw new NotFoundException(`Registro de plano com id ${id} não encontrado`);
    }

    return registro;
  }

  async update(id: string, updatePlanoDto: UpdatePlanoDto) {
    await this.findOne(id);

    // O front envia o objeto inteiro (com id) no PUT; o id da rota é o que vale.
    const { id: _ignorado, ...dados } = updatePlanoDto;

    return this.prisma.plano.update({ where: { id }, data: dados });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.plano.delete({ where: { id } });
  }
}
