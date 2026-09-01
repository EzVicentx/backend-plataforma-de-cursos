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
import { CertificadosService } from './certificados.service';
import { CreateCertificadoDto } from './dto/create-certificado.dto';
import { UpdateCertificadoDto } from './dto/update-certificado.dto';

@ApiTags('certificados')
@Controller('certificados')
export class CertificadosController {
  constructor(private readonly certificadosService: CertificadosService) {}

  @Post()
  @ApiOperation({ summary: 'Criar certificado' })
  @ApiResponse({ status: 201, description: 'Registro criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body() createCertificadoDto: CreateCertificadoDto) {
    return this.certificadosService.create(createCertificadoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar registros de certificado' })
  findAll() {
    return this.certificadosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar certificado pelo id' })
  @ApiResponse({ status: 404, description: 'Registro não encontrado.' })
  findOne(@Param('id') id: string) {
    return this.certificadosService.findOne(id);
  }

  // PUT é o verbo usado pelo front-end (substitui o registro inteiro).
  @Put(':id')
  @ApiOperation({ summary: 'Atualizar certificado (substituição completa)' })
  replace(@Param('id') id: string, @Body() updateCertificadoDto: UpdateCertificadoDto) {
    return this.certificadosService.update(id, updateCertificadoDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar certificado (parcial)' })
  update(@Param('id') id: string, @Body() updateCertificadoDto: UpdateCertificadoDto) {
    return this.certificadosService.update(id, updateCertificadoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover certificado' })
  remove(@Param('id') id: string) {
    return this.certificadosService.remove(id);
  }
}
