export interface Bet {
  eventId: string;
  eventName: string;
  amount: number;
  selectedResult: string;
  odds: number;
  potentialGain: number;
  createdAt: Date;
}
// src/app/models/bet.model.ts
export interface BetResponse {
  _id: string;
  userId: string;
  eventId: string;
  eventName: string;
  amount: number;
  selectedResult: string;
  odds: number;
  potentialGain: number;
  createdAt: Date;
}
