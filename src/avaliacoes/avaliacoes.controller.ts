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
import { AvaliacoesService } from './avaliacoes.service';
import { CreateAvaliacaoDto } from './dto/create-avaliacao.dto';
import { UpdateAvaliacaoDto } from './dto/update-avaliacao.dto';

@ApiTags('avaliacoes')
@Controller('avaliacoes')
export class AvaliacoesController {
  constructor(private readonly avaliacaosService: AvaliacoesService) {}

  @Post()
  @ApiOperation({ summary: 'Criar avaliação' })
  @ApiResponse({ status: 201, description: 'Registro criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body() createAvaliacaoDto: CreateAvaliacaoDto) {
    return this.avaliacaosService.create(createAvaliacaoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar registros de avaliação' })
  findAll() {
    return this.avaliacaosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar avaliação pelo id' })
  @ApiResponse({ status: 404, description: 'Registro não encontrado.' })
  findOne(@Param('id') id: string) {
    return this.avaliacaosService.findOne(id);
  }

  // PUT é o verbo usado pelo front-end (substitui o registro inteiro).
  @Put(':id')
  @ApiOperation({ summary: 'Atualizar avaliação (substituição completa)' })
  replace(@Param('id') id: string, @Body() updateAvaliacaoDto: UpdateAvaliacaoDto) {
    return this.avaliacaosService.update(id, updateAvaliacaoDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar avaliação (parcial)' })
  update(@Param('id') id: string, @Body() updateAvaliacaoDto: UpdateAvaliacaoDto) {
    return this.avaliacaosService.update(id, updateAvaliacaoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover avaliação' })
  remove(@Param('id') id: string) {
    return this.avaliacaosService.remove(id);
  }
}
