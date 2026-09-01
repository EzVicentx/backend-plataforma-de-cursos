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
import { ProgressoAulasService } from './progresso-aulas.service';
import { CreateProgressoAulaDto } from './dto/create-progresso-aula.dto';
import { UpdateProgressoAulaDto } from './dto/update-progresso-aula.dto';

@ApiTags('progressoAulas')
@Controller('progressoAulas')
export class ProgressoAulasController {
  constructor(private readonly progressoAulasService: ProgressoAulasService) {}

  @Post()
  @ApiOperation({ summary: 'Criar progresso de aula' })
  @ApiResponse({ status: 201, description: 'Registro criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body() createProgressoAulaDto: CreateProgressoAulaDto) {
    return this.progressoAulasService.create(createProgressoAulaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar registros de progresso de aula' })
  findAll() {
    return this.progressoAulasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar progresso de aula pelo id' })
  @ApiResponse({ status: 404, description: 'Registro não encontrado.' })
  findOne(@Param('id') id: string) {
    return this.progressoAulasService.findOne(id);
  }

  // PUT é o verbo usado pelo front-end (substitui o registro inteiro).
  @Put(':id')
  @ApiOperation({ summary: 'Atualizar progresso de aula (substituição completa)' })
  replace(@Param('id') id: string, @Body() updateProgressoAulaDto: UpdateProgressoAulaDto) {
    return this.progressoAulasService.update(id, updateProgressoAulaDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar progresso de aula (parcial)' })
  update(@Param('id') id: string, @Body() updateProgressoAulaDto: UpdateProgressoAulaDto) {
    return this.progressoAulasService.update(id, updateProgressoAulaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover progresso de aula' })
  remove(@Param('id') id: string) {
    return this.progressoAulasService.remove(id);
  }
}
