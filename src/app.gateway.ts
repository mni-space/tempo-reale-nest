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
  }

  @SubscribeMessage(MessageTypeEnum.All)
  all(@ConnectedSocket() client: Socket) {
    client
      .to(client.id)
      .emit(MessageTypeEnum.All, this.sockedIds.filter(id => id !== client.id));
  }

  @SubscribeMessage(MessageTypeEnum.Offer)
  offer(@ConnectedSocket() client: Socket, @MessageBody() body: OfferMessage) {
    client
      .to(body.to)
      .emit(MessageTypeEnum.Offer, body);
  }

  @SubscribeMessage(MessageTypeEnum.Answer)
  answer(@ConnectedSocket() client: Socket, @MessageBody() body: AnswerMessage) {
    client
      .to(body.to)
      .emit(MessageTypeEnum.Answer, body);
  }

  @SubscribeMessage(MessageTypeEnum.Candidate)
  candidate(@ConnectedSocket() client: Socket, @MessageBody() body: CandidateMessage) {
    client
      .to(body.to)
      .emit(MessageTypeEnum.Candidate, body);
  }
}
