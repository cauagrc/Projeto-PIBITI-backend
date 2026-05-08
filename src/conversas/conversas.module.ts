import { Module } from '@nestjs/common';
import { ConversasService } from './conversas.service';
import { ConversasController } from './conversas.controller';
import { PrismaService } from 'src/database/prisma.service';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Module({
  controllers: [ConversasController],
  providers: [ConversasService, PrismaService, UsuariosService],
})
export class ConversasModule {}
