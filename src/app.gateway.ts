import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { AnswerMessage, CandidateMessage, MessageTypeEnum, OfferMessage } from './types';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  // store all connected socket ids
  sockedIds: string[] = [];

  handleConnection(client: Socket) {
    this.sockedIds.push(client.id);
  }

  handleDisconnect(client: Socket) {
    this.sockedIds = this.sockedIds.filter(id => id !== client.id);
    this.server.emit(MessageTypeEnum.Leave, client.id);
  }

  @SubscribeMessage(MessageTypeEnum.All)
  all(@ConnectedSocket() client: Socket) {
    const filter = this.sockedIds.filter(id => id !== client.id);
    client.emit(MessageTypeEnum.All, filter);
  }

  @SubscribeMessage(MessageTypeEnum.Offer)
  offer(@ConnectedSocket() client: Socket, @MessageBody() body: OfferMessage) {
    this.server
      .to(body.to)
      .emit(MessageTypeEnum.Offer, {
        from: client.id,
        body,
      });
  }

  @SubscribeMessage(MessageTypeEnum.Answer)
  answer(@ConnectedSocket() client: Socket, @MessageBody() body: AnswerMessage) {
    this.server
      .to(body.to)
      .emit(MessageTypeEnum.Answer, {
        from: client.id,
        body,
      });
  }

  @SubscribeMessage(MessageTypeEnum.Candidate)
  candidate(@ConnectedSocket() client: Socket, @MessageBody() body: CandidateMessage) {
    this.server
      .to(body.to)
      .emit(MessageTypeEnum.Candidate, {
        from: client.id,
        body,
      });
  }
}
