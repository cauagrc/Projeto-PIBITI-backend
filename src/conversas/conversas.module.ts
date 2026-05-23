import { Module } from '@nestjs/common';
import { ConversasService } from './conversas.service';
import { ConversasController } from './conversas.controller';
import { PrismaService } from 'src/database/prisma.service';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { ConversasGateway } from './conversas.gateway';

@Module({
  controllers: [ConversasController],
  providers: [ConversasService, PrismaService, UsuariosService, ConversasGateway],
})
export class ConversasModule {}
