// src/app/components/bet-history-table/bet-history-table.component.ts

import { Component, OnInit } from '@angular/core';
import { BetService } from '../../../core/services/bet.service';
import { BetResponse, Bet } from '../../../models/bet.model'; // Import correcto
import { SportEventsService } from '../../../core/services/sport-events.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-bet-history-table',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './bet-history-table.component.html',
  styleUrls: ['./bet-history-table.component.scss'],
})
export class BetHistoryTableComponent implements OnInit {
  betHistory: Bet[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private betService: BetService,
    private sportEventsService: SportEventsService
  ) {}

  ngOnInit(): void {
    this.fetchBetHistory();
  }

  fetchBetHistory(): void {
    this.isLoading = true;
    this.betService.getUserBets().subscribe({
      next: (bets: BetResponse[]) => {
        if (bets.length === 0) {
          this.isLoading = false;
          return;
        }

        const sportEvents = this.sportEventsService.getEvents();
        const eventMap: {
          [eventId: string]: { eventName: string; odds: number };
        } = {};
        sportEvents.forEach((event) => {
          eventMap[event.eventId] = {
            eventName: event.eventName,
            odds: event.odds,
          };
        });

        this.betHistory = bets.map((bet) => {
          const eventDetails = eventMap[bet.eventId];
          return {
            eventId: bet.eventId,
            eventName: eventDetails
              ? eventDetails.eventName
              : 'Evento Desconocido',
            amount: bet.amount,
            selectedResult: bet.selectedResult,
            odds: eventDetails ? eventDetails.odds : 1.0,
            potentialGain:
              bet.amount * (eventDetails ? eventDetails.odds : 1.0),
            createdAt: new Date(bet.createdAt),
          };
        });
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage =
          'No se pudo cargar el historial de apuestas. Por favor, inténtalo de nuevo más tarde.';
        this.isLoading = false;
      },
    });
  }
}
