import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateModuloDto } from './dto/create-modulo.dto';
import { UpdateModuloDto } from './dto/update-modulo.dto';

@Injectable()
export class ModulosService {
  constructor(private readonly prisma: PrismaService) {}

  create(createModuloDto: CreateModuloDto) {
    return this.prisma.modulo.create({ data: createModuloDto });
  }

  findAll() {
    return this.prisma.modulo.findMany({ orderBy: { ordem: 'asc' } });
  }

  async findOne(id: string) {
    const registro = await this.prisma.modulo.findUnique({ where: { id } });

    if (!registro) {
      throw new NotFoundException(`Registro de módulo com id ${id} não encontrado`);
    }

    return registro;
  }

  async update(id: string, updateModuloDto: UpdateModuloDto) {
    await this.findOne(id);

    // O front envia o objeto inteiro (com id) no PUT; o id da rota é o que vale.
    const { id: _ignorado, ...dados } = updateModuloDto;

    return this.prisma.modulo.update({ where: { id }, data: dados });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.modulo.delete({ where: { id } });
  }
}
