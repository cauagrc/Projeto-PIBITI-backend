import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto, UpdateMessageDto } from './messages.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @ApiOperation({ summary: "Cria uma mensagem" })
  @Post()
  create(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.create(createMessageDto);
  }

  @ApiOperation({ summary: "Obter informacoes uma mensagem" })
  @Get(":id")
  async findOne(@Param('id') id: string) {
    return await this.messagesService.findOne(+id);
  }

  @ApiOperation({ summary: "Listar mensagens de um usuario" })
  @Get(':userId/all')
  async findAll(@Param('userId') id: string) {
    return await this.messagesService.findAll(+id);
  }

  @ApiOperation({ summary: "Editar mensagem do usuario" })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messagesService.update(+id, updateMessageDto);
  }

  @ApiOperation({ summary: "Excluir mensagem do canal" })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.messagesService.remove(+id);
  }
}
