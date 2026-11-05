import { WebSocketGateway, SubscribeMessage, MessageBody, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { WebsocketMiddleware } from './websocket.middleware';

@WebSocketGateway({ cors: true })
export class WebsocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly jwtService: JwtService,
    private readonly middleware: WebsocketMiddleware
  ) {}

  async afterInit(server: Server) {
    server.use(this.middleware.use.bind(this.middleware));
  }

  async handleConnection(client: Socket) {
    const user = client.data.user;

    console.log(`User ${user.id} conectado`);
  }

  async handleDisconnect(client: Socket) {
    const user = client.data.user;

    if (user) console.log(`User ${user.id} desconectou`);
  }
}