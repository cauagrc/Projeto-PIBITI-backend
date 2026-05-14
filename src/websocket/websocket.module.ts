import { Module } from '@nestjs/common';
import { WebsocketGateway } from './websocket.gateway';
import { WebsocketMiddleware } from './websocket.middleware';

@Module({
  providers: [WebsocketGateway, WebsocketMiddleware],
})
export class WebsocketModule {}
