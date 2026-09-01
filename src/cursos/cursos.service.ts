import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';

@Injectable()
export class CursosService {
  constructor(private readonly prisma: PrismaService) {}

  create(createCursoDto: CreateCursoDto) {
    return this.prisma.curso.create({ data: createCursoDto });
  }

  findAll() {
    return this.prisma.curso.findMany();
  }

  async findOne(id: string) {
    const registro = await this.prisma.curso.findUnique({ where: { id } });

    if (!registro) {
      throw new NotFoundException(`Registro de curso com id ${id} não encontrado`);
    }

    return registro;
  }

  async update(id: string, updateCursoDto: UpdateCursoDto) {
    await this.findOne(id);

    // O front envia o objeto inteiro (com id) no PUT; o id da rota é o que vale.
    const { id: _ignorado, ...dados } = updateCursoDto;

    return this.prisma.curso.update({ where: { id }, data: dados });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.curso.delete({ where: { id } });
  }
}
