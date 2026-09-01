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
import { TrilhasCursosService } from './trilhas-cursos.service';
import { CreateTrilhaCursoDto } from './dto/create-trilha-curso.dto';
import { UpdateTrilhaCursoDto } from './dto/update-trilha-curso.dto';

@ApiTags('trilhasCursos')
@Controller('trilhasCursos')
export class TrilhasCursosController {
  constructor(private readonly trilhaCursosService: TrilhasCursosService) {}

  @Post()
  @ApiOperation({ summary: 'Criar curso da trilha' })
  @ApiResponse({ status: 201, description: 'Registro criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body() createTrilhaCursoDto: CreateTrilhaCursoDto) {
    return this.trilhaCursosService.create(createTrilhaCursoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar registros de curso da trilha' })
  findAll() {
    return this.trilhaCursosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar curso da trilha pelo id' })
  @ApiResponse({ status: 404, description: 'Registro não encontrado.' })
  findOne(@Param('id') id: string) {
    return this.trilhaCursosService.findOne(id);
  }

  // PUT é o verbo usado pelo front-end (substitui o registro inteiro).
  @Put(':id')
  @ApiOperation({ summary: 'Atualizar curso da trilha (substituição completa)' })
  replace(@Param('id') id: string, @Body() updateTrilhaCursoDto: UpdateTrilhaCursoDto) {
    return this.trilhaCursosService.update(id, updateTrilhaCursoDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar curso da trilha (parcial)' })
  update(@Param('id') id: string, @Body() updateTrilhaCursoDto: UpdateTrilhaCursoDto) {
    return this.trilhaCursosService.update(id, updateTrilhaCursoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover curso da trilha' })
  remove(@Param('id') id: string) {
    return this.trilhaCursosService.remove(id);
  }
}
