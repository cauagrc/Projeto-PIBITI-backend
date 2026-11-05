import { WebSocketGateway, SubscribeMessage, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { ConversasService } from './conversas.service';
import { ForbiddenException, NotFoundException, UseGuards } from '@nestjs/common';
import { JwtWsGuard } from '../autorizacoes/jwt-ws.guard';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
@UseGuards(JwtWsGuard)
export class ConversasGateway {
  constructor(
    private readonly conversasService: ConversasService,
  ) { }

  @SubscribeMessage('conversation:join')
  async handleJoin(@ConnectedSocket() client: Socket, @MessageBody() conversationId: number) {
    try {
      const user = client.data.user;

      //Verifica existencia da conversa e permissao para entrar
      const conversa = await this.conversasService.joinConversation(user.id, conversationId);

      //Conecta-se a conversa
      const room = `conversation:${conversa.id}`;
      client.join(room); 

      client.emit('conversation:joined', { id: conversa.id, nome: conversa.nome })

      console.log(`User ${user.id} entrou em ${room}`);
      //Tratamento dos exceptions
    } catch (error) {
      if (error instanceof NotFoundException) {
        return client.emit('conversation:error', { message: 'Conversa não encontrada' });
      }

      if (error instanceof ForbiddenException) {
        return client.emit('conversation:error', { message: `Você não pertence à conversa ${conversationId}` });
      }

      client.emit('conversation:error', { message: 'Error' });
    }
  }

  @SubscribeMessage('conversation:leave')
  async handleLeave(@ConnectedSocket() client: Socket, @MessageBody() conversationId: number) {
    const user = client.data.user;

    const room = `conversation:${conversationId}`;

    client.leave(room);

    client.emit('conversation:left', { conversationId });

    console.log(`User ${user.id} saiu de ${room}`);
  }
}