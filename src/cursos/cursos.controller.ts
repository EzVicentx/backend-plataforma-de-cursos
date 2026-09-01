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
import { CursosService } from './cursos.service';
import { CreateCursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';

@ApiTags('cursos')
@Controller('cursos')
export class CursosController {
  constructor(private readonly cursosService: CursosService) {}

  @Post()
  @ApiOperation({ summary: 'Criar curso' })
  @ApiResponse({ status: 201, description: 'Registro criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body() createCursoDto: CreateCursoDto) {
    return this.cursosService.create(createCursoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar registros de curso' })
  findAll() {
    return this.cursosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar curso pelo id' })
  @ApiResponse({ status: 404, description: 'Registro não encontrado.' })
  findOne(@Param('id') id: string) {
    return this.cursosService.findOne(id);
  }

  // PUT é o verbo usado pelo front-end (substitui o registro inteiro).
  @Put(':id')
  @ApiOperation({ summary: 'Atualizar curso (substituição completa)' })
  replace(@Param('id') id: string, @Body() updateCursoDto: UpdateCursoDto) {
    return this.cursosService.update(id, updateCursoDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar curso (parcial)' })
  update(@Param('id') id: string, @Body() updateCursoDto: UpdateCursoDto) {
    return this.cursosService.update(id, updateCursoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover curso' })
  remove(@Param('id') id: string) {
    return this.cursosService.remove(id);
  }
}
