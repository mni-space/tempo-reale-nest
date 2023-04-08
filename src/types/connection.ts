import { MessageTypeEnum } from './enum';

export interface MessageConnection {
  id: string;
  to: string;
}

export interface OfferMessage extends MessageConnection {
  type: MessageTypeEnum.Offer;
  offer: RTCSessionDescriptionInit;
}

export interface AnswerMessage extends MessageConnection {
  type: MessageTypeEnum.Answer;
  answer: RTCSessionDescriptionInit;
}

export interface CandidateMessage extends MessageConnection {
  type: MessageTypeEnum.Candidate;
  candidate: RTCIceCandidateInit;
}
