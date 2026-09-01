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
import { TrilhasService } from './trilhas.service';
import { CreateTrilhaDto } from './dto/create-trilha.dto';
import { UpdateTrilhaDto } from './dto/update-trilha.dto';

@ApiTags('trilhas')
@Controller('trilhas')
export class TrilhasController {
  constructor(private readonly trilhasService: TrilhasService) {}

  @Post()
  @ApiOperation({ summary: 'Criar trilha' })
  @ApiResponse({ status: 201, description: 'Registro criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body() createTrilhaDto: CreateTrilhaDto) {
    return this.trilhasService.create(createTrilhaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar registros de trilha' })
  findAll() {
    return this.trilhasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar trilha pelo id' })
  @ApiResponse({ status: 404, description: 'Registro não encontrado.' })
  findOne(@Param('id') id: string) {
    return this.trilhasService.findOne(id);
  }

  // PUT é o verbo usado pelo front-end (substitui o registro inteiro).
  @Put(':id')
  @ApiOperation({ summary: 'Atualizar trilha (substituição completa)' })
  replace(@Param('id') id: string, @Body() updateTrilhaDto: UpdateTrilhaDto) {
    return this.trilhasService.update(id, updateTrilhaDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar trilha (parcial)' })
  update(@Param('id') id: string, @Body() updateTrilhaDto: UpdateTrilhaDto) {
    return this.trilhasService.update(id, updateTrilhaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover trilha' })
  remove(@Param('id') id: string) {
    return this.trilhasService.remove(id);
  }
}
