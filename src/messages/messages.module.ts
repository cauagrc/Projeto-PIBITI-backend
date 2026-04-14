import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { PrismaService } from 'src/database/prisma.service';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Module({
  controllers: [MessagesController],
  providers: [MessagesService, PrismaService, UsuariosService],
})
export class MessagesModule {}
