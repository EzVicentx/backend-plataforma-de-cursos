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
import { AulasService } from './aulas.service';
import { CreateAulaDto } from './dto/create-aula.dto';
import { UpdateAulaDto } from './dto/update-aula.dto';

@ApiTags('aulas')
@Controller('aulas')
export class AulasController {
  constructor(private readonly aulasService: AulasService) {}

  @Post()
  @ApiOperation({ summary: 'Criar aula' })
  @ApiResponse({ status: 201, description: 'Registro criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body() createAulaDto: CreateAulaDto) {
    return this.aulasService.create(createAulaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar registros de aula' })
  findAll() {
    return this.aulasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar aula pelo id' })
  @ApiResponse({ status: 404, description: 'Registro não encontrado.' })
  findOne(@Param('id') id: string) {
    return this.aulasService.findOne(id);
  }

  // PUT é o verbo usado pelo front-end (substitui o registro inteiro).
  @Put(':id')
  @ApiOperation({ summary: 'Atualizar aula (substituição completa)' })
  replace(@Param('id') id: string, @Body() updateAulaDto: UpdateAulaDto) {
    return this.aulasService.update(id, updateAulaDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar aula (parcial)' })
  update(@Param('id') id: string, @Body() updateAulaDto: UpdateAulaDto) {
    return this.aulasService.update(id, updateAulaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover aula' })
  remove(@Param('id') id: string) {
    return this.aulasService.remove(id);
  }
}
