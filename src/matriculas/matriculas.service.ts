import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMatriculaDto } from './dto/create-matricula.dto';
import { UpdateMatriculaDto } from './dto/update-matricula.dto';

@Injectable()
export class MatriculasService {
  constructor(private readonly prisma: PrismaService) {}

  create(createMatriculaDto: CreateMatriculaDto) {
    return this.prisma.matricula.create({ data: createMatriculaDto });
  }

  findAll() {
    return this.prisma.matricula.findMany();
  }

  async findOne(id: string) {
    const registro = await this.prisma.matricula.findUnique({ where: { id } });

    if (!registro) {
      throw new NotFoundException(`Registro de matrícula com id ${id} não encontrado`);
    }

    return registro;
  }

  async update(id: string, updateMatriculaDto: UpdateMatriculaDto) {
    await this.findOne(id);

    // O front envia o objeto inteiro (com id) no PUT; o id da rota é o que vale.
    const { id: _ignorado, ...dados } = updateMatriculaDto;

    return this.prisma.matricula.update({ where: { id }, data: dados });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.matricula.delete({ where: { id } });
  }
}
