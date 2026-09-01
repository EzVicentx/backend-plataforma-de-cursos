import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePagamentoDto } from './dto/create-pagamento.dto';
import { UpdatePagamentoDto } from './dto/update-pagamento.dto';

@Injectable()
export class PagamentosService {
  constructor(private readonly prisma: PrismaService) {}

  create(createPagamentoDto: CreatePagamentoDto) {
    return this.prisma.pagamento.create({ data: createPagamentoDto });
  }

  findAll() {
    return this.prisma.pagamento.findMany();
  }

  async findOne(id: string) {
    const registro = await this.prisma.pagamento.findUnique({ where: { id } });

    if (!registro) {
      throw new NotFoundException(`Registro de pagamento com id ${id} não encontrado`);
    }

    return registro;
  }

  async update(id: string, updatePagamentoDto: UpdatePagamentoDto) {
    await this.findOne(id);

    // O front envia o objeto inteiro (com id) no PUT; o id da rota é o que vale.
    const { id: _ignorado, ...dados } = updatePagamentoDto;

    return this.prisma.pagamento.update({ where: { id }, data: dados });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.pagamento.delete({ where: { id } });
  }
}
