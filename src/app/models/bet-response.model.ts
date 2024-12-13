export interface BetResponse {
  _id: string;
  userId: string;
  eventId: string;
  eventName: string;
  amount: number;
  selectedResult: string;
  odds: number;
  potentialGain: number;
  createdAt: string;
}
