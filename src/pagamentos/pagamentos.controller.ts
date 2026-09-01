import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PagamentosService } from './pagamentos.service';
import { CreatePagamentoDto } from './dto/create-pagamento.dto';
import { UpdatePagamentoDto } from './dto/update-pagamento.dto';

@ApiTags('pagamentos')
@Controller('pagamentos')
export class PagamentosController {
  constructor(private readonly pagamentosService: PagamentosService) {}

  @Post()
  @ApiOperation({ summary: 'Criar pagamento' })
  @ApiResponse({ status: 201, description: 'Registro criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body() createPagamentoDto: CreatePagamentoDto) {
    return this.pagamentosService.create(createPagamentoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar registros de pagamento' })
  findAll() {
    return this.pagamentosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar pagamento pelo id' })
  @ApiResponse({ status: 404, description: 'Registro não encontrado.' })
  findOne(@Param('id') id: string) {
    return this.pagamentosService.findOne(id);
  }

  // PUT é o verbo usado pelo front-end (substitui o registro inteiro).
  @Put(':id')
  @ApiOperation({ summary: 'Atualizar pagamento (substituição completa)' })
  replace(@Param('id') id: string, @Body() updatePagamentoDto: UpdatePagamentoDto) {
    return this.pagamentosService.update(id, updatePagamentoDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar pagamento (parcial)' })
  update(@Param('id') id: string, @Body() updatePagamentoDto: UpdatePagamentoDto) {
    return this.pagamentosService.update(id, updatePagamentoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover pagamento' })
  remove(@Param('id') id: string) {
    return this.pagamentosService.remove(id);
  }
}
