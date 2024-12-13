export interface CompetitorName {
  es: string;
  en: string;
}

export interface Competitor {
  score: number | null;
  competitorName: CompetitorName;
  penaltyScore: number | null;
  qualifier: string;
  countryName: CompetitorName;
}

export interface OutcomeName {
  es: string;
  en: string;
}

export interface Outcome {
  _id: string;
  specifiers: string;
  odds: number;
  oddsUS: number;
  active: boolean;
  isPlayerOutcome: boolean;
  probability: number;
  outcomeName: OutcomeName;
}

export interface MarketLine {
  specifiers: string;
  status: string;
  outcomes: Outcome[];
}

export interface Market {
  marketId: number;
  producerId: number;
  eventId: string;
  isBettingOpen: string;
  favourite: boolean;
  isMarketCustomBet: string;
  marketName: OutcomeName;
  marketLines: MarketLine[];
}

export interface TournamentName {
  es: string;
  en: string;
}

export interface Tournament {
  categoryId: string;
  tournamentName: TournamentName;
}

export interface MatchStatus {
  es: string;
  en: string;
}

export interface EventStatus {
  statusEventSport: string;
  matchStatus: MatchStatus;
}

export interface CoverageInfo {
  isLive: boolean;
  bookingStatus: string;
}

export interface SportEvent {
  tournamentId: string;
  eventStatus: EventStatus;
  coverageInfo: CoverageInfo;
  competitorHome: Competitor;
  competitorAway: Competitor;
  eventId: string;
  sportId: string;
  sportEventName: OutcomeName;
  scheduled: string; // Usaremos string para facilitar el almacenamiento y manejo
  eventType: string;
  producerId: number;
  producerName: string;
  isCustomBet: string;
  tournament: Tournament;
  markets: Market[];
}
