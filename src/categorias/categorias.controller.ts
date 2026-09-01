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
import { CategoriasService } from './categorias.service';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';

@ApiTags('categorias')
@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Post()
  @ApiOperation({ summary: 'Criar categoria' })
  @ApiResponse({ status: 201, description: 'Registro criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body() createCategoriaDto: CreateCategoriaDto) {
    return this.categoriasService.create(createCategoriaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar registros de categoria' })
  findAll() {
    return this.categoriasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar categoria pelo id' })
  @ApiResponse({ status: 404, description: 'Registro não encontrado.' })
  findOne(@Param('id') id: string) {
    return this.categoriasService.findOne(id);
  }

  // PUT é o verbo usado pelo front-end (substitui o registro inteiro).
  @Put(':id')
  @ApiOperation({ summary: 'Atualizar categoria (substituição completa)' })
  replace(@Param('id') id: string, @Body() updateCategoriaDto: UpdateCategoriaDto) {
    return this.categoriasService.update(id, updateCategoriaDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar categoria (parcial)' })
  update(@Param('id') id: string, @Body() updateCategoriaDto: UpdateCategoriaDto) {
    return this.categoriasService.update(id, updateCategoriaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover categoria' })
  remove(@Param('id') id: string) {
    return this.categoriasService.remove(id);
  }
}
