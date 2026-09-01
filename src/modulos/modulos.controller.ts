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
import { ModulosService } from './modulos.service';
import { CreateModuloDto } from './dto/create-modulo.dto';
import { UpdateModuloDto } from './dto/update-modulo.dto';

@ApiTags('modulos')
@Controller('modulos')
export class ModulosController {
  constructor(private readonly modulosService: ModulosService) {}

  @Post()
  @ApiOperation({ summary: 'Criar módulo' })
  @ApiResponse({ status: 201, description: 'Registro criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body() createModuloDto: CreateModuloDto) {
    return this.modulosService.create(createModuloDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar registros de módulo' })
  findAll() {
    return this.modulosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar módulo pelo id' })
  @ApiResponse({ status: 404, description: 'Registro não encontrado.' })
  findOne(@Param('id') id: string) {
    return this.modulosService.findOne(id);
  }

  // PUT é o verbo usado pelo front-end (substitui o registro inteiro).
  @Put(':id')
  @ApiOperation({ summary: 'Atualizar módulo (substituição completa)' })
  replace(@Param('id') id: string, @Body() updateModuloDto: UpdateModuloDto) {
    return this.modulosService.update(id, updateModuloDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar módulo (parcial)' })
  update(@Param('id') id: string, @Body() updateModuloDto: UpdateModuloDto) {
    return this.modulosService.update(id, updateModuloDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover módulo' })
  remove(@Param('id') id: string) {
    return this.modulosService.remove(id);
  }
}
