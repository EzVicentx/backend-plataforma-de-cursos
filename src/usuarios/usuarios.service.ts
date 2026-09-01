import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(private readonly prisma: PrismaService) {}

  create(createUsuarioDto: CreateUsuarioDto) {
    return this.prisma.usuario.create({ data: createUsuarioDto });
  }

  findAll() {
    return this.prisma.usuario.findMany();
  }

  async findOne(id: string) {
    const registro = await this.prisma.usuario.findUnique({ where: { id } });

    if (!registro) {
      throw new NotFoundException(`Registro de usuário com id ${id} não encontrado`);
    }

    return registro;
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    await this.findOne(id);

    // O front envia o objeto inteiro (com id) no PUT; o id da rota é o que vale.
    const { id: _ignorado, ...dados } = updateUsuarioDto;

    return this.prisma.usuario.update({ where: { id }, data: dados });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.usuario.delete({ where: { id } });
  }
}
