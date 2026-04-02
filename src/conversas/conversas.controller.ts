import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ConversasService } from './conversas.service';
import { CreateConversaDto, UpdateConversaDto } from './conversas.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('conversas')
export class ConversasController {
  constructor(private readonly conversasService: ConversasService) {}

  @ApiOperation({ summary: 'Criar uma conversa entre dois usuários' })
  @Post()
  create(@Body() createConversaDto: CreateConversaDto) {
    return this.conversasService.create(createConversaDto);
  }

  @ApiOperation({ summary: 'Listar todas as conversas de um usuário' })
  @Get(':userId/usuario')
  findAll(@Param('userId') id: string) {
    return this.conversasService.findAll(+id);
  }

  @ApiOperation({ summary: 'Listar todas as mensagens de uma conversa' })
  @Get(':id/mensagens')
  findAllMessages(@Param('id') id: string) {
    return 'Não realizado ainda';
  }

  @ApiOperation({ summary: 'Obter informações de uma conversa' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.conversasService.findOne(+id);
  }

  @ApiOperation({ summary: 'Atualizar uma conversa' })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateConversaDto: UpdateConversaDto) {
    return this.conversasService.update(+id, updateConversaDto);
  }

  @ApiOperation({ summary: 'Deletar uma conversa' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.conversasService.remove(+id);
  }
}