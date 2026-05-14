import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';

@Injectable()
export class WebsocketMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(socket: Socket, next: (err?: Error) => void) {
    try {
      const token = socket.handshake?.auth?.token || socket.handshake?.headers?.authorization?.replace('Bearer ', '');

      //Nao forneceu um token
      if (!token) {
        return next(new Error('Bloqueado'));
      }

      const payload = this.jwtService.verify(token);

      // Armazena no socket os dados extraídos do token
      socket.data.user = payload;

      next();
    } catch {
      //Tokens expirados, tokens invalidos
      next(new Error('Por favor, forneça um token válido'));
    }
  }
}