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
import { PlanosService } from './planos.service';
import { CreatePlanoDto } from './dto/create-plano.dto';
import { UpdatePlanoDto } from './dto/update-plano.dto';

@ApiTags('planos')
@Controller('planos')
export class PlanosController {
  constructor(private readonly planosService: PlanosService) {}

  @Post()
  @ApiOperation({ summary: 'Criar plano' })
  @ApiResponse({ status: 201, description: 'Registro criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body() createPlanoDto: CreatePlanoDto) {
    return this.planosService.create(createPlanoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar registros de plano' })
  findAll() {
    return this.planosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar plano pelo id' })
  @ApiResponse({ status: 404, description: 'Registro não encontrado.' })
  findOne(@Param('id') id: string) {
    return this.planosService.findOne(id);
  }

  // PUT é o verbo usado pelo front-end (substitui o registro inteiro).
  @Put(':id')
  @ApiOperation({ summary: 'Atualizar plano (substituição completa)' })
  replace(@Param('id') id: string, @Body() updatePlanoDto: UpdatePlanoDto) {
    return this.planosService.update(id, updatePlanoDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar plano (parcial)' })
  update(@Param('id') id: string, @Body() updatePlanoDto: UpdatePlanoDto) {
    return this.planosService.update(id, updatePlanoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover plano' })
  remove(@Param('id') id: string) {
    return this.planosService.remove(id);
  }
}
