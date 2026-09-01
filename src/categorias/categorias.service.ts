import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@Injectable()
export class CategoriasService {
  constructor(private readonly prisma: PrismaService) {}

  create(createCategoriaDto: CreateCategoriaDto) {
    return this.prisma.categoria.create({ data: createCategoriaDto });
  }

  findAll() {
    return this.prisma.categoria.findMany();
  }

  async findOne(id: string) {
    const registro = await this.prisma.categoria.findUnique({ where: { id } });

    if (!registro) {
      throw new NotFoundException(`Registro de categoria com id ${id} não encontrado`);
    }

    return registro;
  }

  async update(id: string, updateCategoriaDto: UpdateCategoriaDto) {
    await this.findOne(id);

    // O front envia o objeto inteiro (com id) no PUT; o id da rota é o que vale.
    const { id: _ignorado, ...dados } = updateCategoriaDto;

    return this.prisma.categoria.update({ where: { id }, data: dados });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.categoria.delete({ where: { id } });
  }
}
