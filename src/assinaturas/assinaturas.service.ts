import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAssinaturaDto } from './dto/create-assinatura.dto';
import { UpdateAssinaturaDto } from './dto/update-assinatura.dto';

@Injectable()
export class AssinaturasService {
  constructor(private readonly prisma: PrismaService) {}

  create(createAssinaturaDto: CreateAssinaturaDto) {
    return this.prisma.assinatura.create({ data: createAssinaturaDto });
  }

  findAll() {
    return this.prisma.assinatura.findMany();
  }

  async findOne(id: string) {
    const registro = await this.prisma.assinatura.findUnique({ where: { id } });

    if (!registro) {
      throw new NotFoundException(`Registro de assinatura com id ${id} não encontrado`);
    }

    return registro;
  }

  async update(id: string, updateAssinaturaDto: UpdateAssinaturaDto) {
    await this.findOne(id);

    // O front envia o objeto inteiro (com id) no PUT; o id da rota é o que vale.
    const { id: _ignorado, ...dados } = updateAssinaturaDto;

    return this.prisma.assinatura.update({ where: { id }, data: dados });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.assinatura.delete({ where: { id } });
  }
}
