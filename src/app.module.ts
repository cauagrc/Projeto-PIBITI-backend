import { Module } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AutorizacoesModule } from './autorizacoes/auths.module';
import { InstituicoesModule } from './instituicoes/instituicoes.module';
import { PermutacoesModule } from './permutacoes/permutacoes.module';
import { SolicitacoesModule } from './solicitacoes/solicitacoes.module';
import { ForunsModule } from './foruns/foruns.module';
import { ConversasModule } from './conversas/conversas.module';
import { MessagesModule } from './messages/messages.module';
import { WebsocketModule } from './websocket/websocket.module';

@Module({
  imports: [UsuariosModule,ForunsModule, AutorizacoesModule, InstituicoesModule, PermutacoesModule, SolicitacoesModule, ForunsModule, ConversasModule, MessagesModule, WebsocketModule],
  providers: [PrismaService],
})
export class AppModule {}
