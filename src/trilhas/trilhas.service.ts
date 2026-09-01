import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTrilhaDto } from './dto/create-trilha.dto';
import { UpdateTrilhaDto } from './dto/update-trilha.dto';

@Injectable()
export class TrilhasService {
  constructor(private readonly prisma: PrismaService) {}

  create(createTrilhaDto: CreateTrilhaDto) {
    return this.prisma.trilha.create({ data: createTrilhaDto });
  }

  findAll() {
    return this.prisma.trilha.findMany();
  }

  async findOne(id: string) {
    const registro = await this.prisma.trilha.findUnique({ where: { id } });

    if (!registro) {
      throw new NotFoundException(`Registro de trilha com id ${id} não encontrado`);
    }

    return registro;
  }

  async update(id: string, updateTrilhaDto: UpdateTrilhaDto) {
    await this.findOne(id);

    // O front envia o objeto inteiro (com id) no PUT; o id da rota é o que vale.
    const { id: _ignorado, ...dados } = updateTrilhaDto;

    return this.prisma.trilha.update({ where: { id }, data: dados });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.trilha.delete({ where: { id } });
  }
}
