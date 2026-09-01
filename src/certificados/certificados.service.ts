import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCertificadoDto } from './dto/create-certificado.dto';
import { UpdateCertificadoDto } from './dto/update-certificado.dto';

@Injectable()
export class CertificadosService {
  constructor(private readonly prisma: PrismaService) {}

  create(createCertificadoDto: CreateCertificadoDto) {
    return this.prisma.certificado.create({ data: createCertificadoDto });
  }

  findAll() {
    return this.prisma.certificado.findMany();
  }

  async findOne(id: string) {
    const registro = await this.prisma.certificado.findUnique({ where: { id } });

    if (!registro) {
      throw new NotFoundException(`Registro de certificado com id ${id} não encontrado`);
    }

    return registro;
  }

  async update(id: string, updateCertificadoDto: UpdateCertificadoDto) {
    await this.findOne(id);

    // O front envia o objeto inteiro (com id) no PUT; o id da rota é o que vale.
    const { id: _ignorado, ...dados } = updateCertificadoDto;

    return this.prisma.certificado.update({ where: { id }, data: dados });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.certificado.delete({ where: { id } });
  }
}
