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
import { AssinaturasService } from './assinaturas.service';
import { CreateAssinaturaDto } from './dto/create-assinatura.dto';
import { UpdateAssinaturaDto } from './dto/update-assinatura.dto';

@ApiTags('assinaturas')
@Controller('assinaturas')
export class AssinaturasController {
  constructor(private readonly assinaturasService: AssinaturasService) {}

  @Post()
  @ApiOperation({ summary: 'Criar assinatura' })
  @ApiResponse({ status: 201, description: 'Registro criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body() createAssinaturaDto: CreateAssinaturaDto) {
    return this.assinaturasService.create(createAssinaturaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar registros de assinatura' })
  findAll() {
    return this.assinaturasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar assinatura pelo id' })
  @ApiResponse({ status: 404, description: 'Registro não encontrado.' })
  findOne(@Param('id') id: string) {
    return this.assinaturasService.findOne(id);
  }

  // PUT é o verbo usado pelo front-end (substitui o registro inteiro).
  @Put(':id')
  @ApiOperation({ summary: 'Atualizar assinatura (substituição completa)' })
  replace(@Param('id') id: string, @Body() updateAssinaturaDto: UpdateAssinaturaDto) {
    return this.assinaturasService.update(id, updateAssinaturaDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar assinatura (parcial)' })
  update(@Param('id') id: string, @Body() updateAssinaturaDto: UpdateAssinaturaDto) {
    return this.assinaturasService.update(id, updateAssinaturaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover assinatura' })
  remove(@Param('id') id: string) {
    return this.assinaturasService.remove(id);
  }
}
