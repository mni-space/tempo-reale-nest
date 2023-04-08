export interface MessageConnection {
  to: string;
}

export interface OfferMessage extends MessageConnection {
  offer: RTCSessionDescriptionInit;
}

export interface AnswerMessage extends MessageConnection {
  answer: RTCSessionDescriptionInit;
}

export interface CandidateMessage extends MessageConnection {
  candidate: RTCIceCandidateInit;
}
