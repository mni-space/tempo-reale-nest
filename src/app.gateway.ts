import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway()
export class AppGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('identity')
  async identity(@MessageBody() body: number): Promise<string> {
    return 'data';
  }

  @SubscribeMessage('events')
  async events(@MessageBody() body: number): Promise<string> {
    return 'events';
  }
}
