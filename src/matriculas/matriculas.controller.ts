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
import { MatriculasService } from './matriculas.service';
import { CreateMatriculaDto } from './dto/create-matricula.dto';
import { UpdateMatriculaDto } from './dto/update-matricula.dto';

@ApiTags('matriculas')
@Controller('matriculas')
export class MatriculasController {
  constructor(private readonly matriculasService: MatriculasService) {}

  @Post()
  @ApiOperation({ summary: 'Criar matrícula' })
  @ApiResponse({ status: 201, description: 'Registro criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body() createMatriculaDto: CreateMatriculaDto) {
    return this.matriculasService.create(createMatriculaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar registros de matrícula' })
  findAll() {
    return this.matriculasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar matrícula pelo id' })
  @ApiResponse({ status: 404, description: 'Registro não encontrado.' })
  findOne(@Param('id') id: string) {
    return this.matriculasService.findOne(id);
  }

  // PUT é o verbo usado pelo front-end (substitui o registro inteiro).
  @Put(':id')
  @ApiOperation({ summary: 'Atualizar matrícula (substituição completa)' })
  replace(@Param('id') id: string, @Body() updateMatriculaDto: UpdateMatriculaDto) {
    return this.matriculasService.update(id, updateMatriculaDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar matrícula (parcial)' })
  update(@Param('id') id: string, @Body() updateMatriculaDto: UpdateMatriculaDto) {
    return this.matriculasService.update(id, updateMatriculaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover matrícula' })
  remove(@Param('id') id: string) {
    return this.matriculasService.remove(id);
  }
}
