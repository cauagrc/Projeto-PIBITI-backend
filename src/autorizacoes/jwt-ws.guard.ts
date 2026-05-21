import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';

@Injectable()
export class JwtWsGuard implements CanActivate {
  constructor() {}

  canActivate(context: ExecutionContext): boolean {

    const client: Socket = context.switchToWs().getClient();

    if(!client.data.user) {
      throw new UnauthorizedException("Bloqueado");
    }

    return true;
  }
}