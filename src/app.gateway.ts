import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { AnswerMessage, CandidateMessage, MessageTypeEnum, OfferMessage } from './types';

@WebSocketGateway()
export class AppGateway {
  @WebSocketServer()
  server: Server;

  // store all connected socket ids
  sockedIds: string[] = [];

  @SubscribeMessage(MessageTypeEnum.Connection)
  connection(@ConnectedSocket() client: Socket) {
    this.sockedIds.push(client.id);
  }

  @SubscribeMessage(MessageTypeEnum.Disconnect)
  disconnect(@ConnectedSocket() client: Socket) {
    this.sockedIds = this.sockedIds.filter(id => id !== client.id);
  }

  @SubscribeMessage(MessageTypeEnum.All)
  all(@ConnectedSocket() client: Socket) {
    client.emit(MessageTypeEnum.All, this.sockedIds.filter(id => id !== client.id));
  }

  @SubscribeMessage(MessageTypeEnum.Offer)
  offer(@ConnectedSocket() client: Socket, @MessageBody() body: OfferMessage) {
    client
      .broadcast
      .to(body.to)
      .emit(MessageTypeEnum.Offer, body);
  }

  @SubscribeMessage(MessageTypeEnum.Answer)
  answer(@ConnectedSocket() client: Socket, @MessageBody() body: AnswerMessage) {
    client
      .broadcast
      .to(body.to)
      .emit(MessageTypeEnum.Answer, body);
  }

  @SubscribeMessage(MessageTypeEnum.Candidate)
  candidate(@ConnectedSocket() client: Socket, @MessageBody() body: CandidateMessage) {
    client
      .broadcast
      .to(body.to)
      .emit(MessageTypeEnum.Candidate, body);
  }
}
