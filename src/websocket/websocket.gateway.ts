import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway({ cors: true })
export class WebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;
  
  constructor(private readonly jwtService: JwtService) {}

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake?.auth?.token || client.handshake?.headers?.authorization?.replace('Bearer ', '');

      const payload = this.jwtService.verify(token);

      client.data.user = payload;

      console.log(`User ${payload.id} conectado`);
    } catch {
      console.log('Token expirado');
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    const user = client.data.user;
    if (user) console.log(`User ${user.id} desconectou`);
  }
}