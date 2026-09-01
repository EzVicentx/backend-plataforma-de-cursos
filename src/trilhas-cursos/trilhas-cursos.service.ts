import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTrilhaCursoDto } from './dto/create-trilha-curso.dto';
import { UpdateTrilhaCursoDto } from './dto/update-trilha-curso.dto';

@Injectable()
export class TrilhasCursosService {
  constructor(private readonly prisma: PrismaService) {}

  create(createTrilhaCursoDto: CreateTrilhaCursoDto) {
    return this.prisma.trilhaCurso.create({ data: createTrilhaCursoDto });
  }

  findAll() {
    return this.prisma.trilhaCurso.findMany({ orderBy: { ordem: 'asc' } });
  }

  async findOne(id: string) {
    const registro = await this.prisma.trilhaCurso.findUnique({ where: { id } });

    if (!registro) {
      throw new NotFoundException(`Registro de curso da trilha com id ${id} não encontrado`);
    }

    return registro;
  }

  async update(id: string, updateTrilhaCursoDto: UpdateTrilhaCursoDto) {
    await this.findOne(id);

    // O front envia o objeto inteiro (com id) no PUT; o id da rota é o que vale.
    const { id: _ignorado, ...dados } = updateTrilhaCursoDto;

    return this.prisma.trilhaCurso.update({ where: { id }, data: dados });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.trilhaCurso.delete({ where: { id } });
  }
}
