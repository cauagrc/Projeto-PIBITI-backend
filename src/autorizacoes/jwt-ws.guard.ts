import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';

@Injectable()
export class JwtWsGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {

    const client: Socket = context.switchToWs().getClient();

    const token = client.handshake?.auth?.token || client.handshake?.headers?.authorization?.replace('Bearer ', '');

    if (!token) {
      throw new UnauthorizedException('Token não fornecido');
    }

    try {
      const payload = this.jwtService.verify(token);

      console.log(payload);

      client.data.user = payload;

      console.log(client.data.user);

      return true;

    } catch {
      throw new UnauthorizedException('Token inválido');
    }
  }
}