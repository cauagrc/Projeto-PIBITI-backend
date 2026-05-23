import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket, WebSocketServer } from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { ForbiddenException, NotFoundException, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtWsGuard } from '../autorizacoes/jwt-ws.guard';
import { Server, Socket } from 'socket.io';
import { CreateMessageDto, UpdateMessageDto, SendMessage, DeleteMessage } from "./messages.dto";

@WebSocketGateway({ cors: true })
@UseGuards(JwtWsGuard)
export class MessagesGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly messagesService: MessagesService,
  ) {}

  @SubscribeMessage('message:create')
  async handleMessage(@MessageBody() body: SendMessage, @ConnectedSocket() client: Socket) {
    const user = client.data.user;

    const message = await this.messagesService.create({
      authorId: user.id,
      content: body.content,
      conversationId: body.conversationId,
    });

    const room = `conversation:${body.conversationId}`;

    this.server.to(room).emit('message:new', message);

    return message;
  }

  @SubscribeMessage('message:delete')
  async handleDelete(@MessageBody() body: DeleteMessage, @ConnectedSocket() client: Socket) {
    try {
      const user = client.data.user;

      const message = await this.messagesService.remove(body.messageId, user.id);

      const room = `conversation:${message.conversation_id}`;

      this.server.to(room).emit('message:deleted', { 
        messageId: body.messageId 
      });

    } catch (error) {
      //Emite evento de error com a mensagem do erro lançado pelo exeception
      client.emit('message:error', error.message);
    }
  }
}