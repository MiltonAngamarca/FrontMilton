import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterService } from '../../../core/services/filter.service';
import { SportEvent } from '../../../models/sport-event.model';
import { TranslateStatusPipe } from '../../../core/pipes/translate-status.pipe';
import { BetService } from '../../../core/services/bet.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { BetCouponComponent } from '../bet-coupon/bet-coupon.component';
import { BetModalComponent } from '../bet-modal/bet-modal.component';
import { Bet } from '../../../models/bet.model';

@Component({
  selector: 'app-sport-events-table',
  standalone: true,
  templateUrl: './sport-events-table.component.html',
  styleUrls: ['./sport-events-table.component.scss'],
  imports: [
    CommonModule,
    TranslateStatusPipe,
    FormsModule,
    ToastrModule,
    BetCouponComponent,
    BetModalComponent,
  ],
})
export class SportEventsTableComponent implements OnInit {
  @Input() events: SportEvent[] = [];
  filteredEvents: SportEvent[] = [];
  isBetting: { [eventId: string]: boolean } = {};
  bets: Bet[] = [];
  showModal: boolean = false;
  selectedEvent: SportEvent | null = null;

  constructor(
    private filterService: FilterService,
    private betService: BetService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.filteredEvents = this.events;
    this.loadBetsFromSession();
    this.subscribeToFilters();
  }

  private loadBetsFromSession(): void {
    const betsJson = sessionStorage.getItem('bets');
    if (betsJson) {
      this.bets = JSON.parse(betsJson);
    }
  }

  private saveBetsToSession(): void {
    sessionStorage.setItem('bets', JSON.stringify(this.bets));
  }

  private subscribeToFilters(): void {
    const filterFunctions = {
      team: (event: SportEvent, filterValue: string) =>
        event.competitorHome.competitorName.es
          .toLowerCase()
          .includes(filterValue.toLowerCase()) ||
        event.competitorAway.competitorName.es
          .toLowerCase()
          .includes(filterValue.toLowerCase()),

      date: (event: SportEvent, filterValue: Date) => {
        const eventDate = new Date(event.scheduled);
        eventDate.setHours(0, 0, 0, 0);
        return eventDate.getTime() === filterValue.getTime();
      },

      status: (event: SportEvent, filterValues: string[]) =>
        filterValues.includes(event.eventStatus.statusEventSport),
    };

    this.filterService.filters$.subscribe(() => {
      this.filteredEvents = this.filterService.applyFilters(
        this.events,
        filterFunctions
      );
    });
  }

  trackByEventId(index: number, event: SportEvent): string {
    return event.eventId;
  }

  openBetModal(event: SportEvent): void {
    this.selectedEvent = event;
    this.showModal = true;
    document.body.style.overflow = 'hidden';
  }

  closeModal(): void {
    this.showModal = false;
    this.selectedEvent = null;
    document.body.style.overflow = 'auto';
  }

  handleSubmitBet(betData: {
    amount: number;
    selectedResult: string;
    odds: number;
  }): void {
    if (!this.selectedEvent) return;

    const eventId = this.selectedEvent.eventId;
    const eventName = `${this.selectedEvent.competitorHome.competitorName.es} vs. ${this.selectedEvent.competitorAway.competitorName.es}`;
    const amount = betData.amount;
    const selectedResult = betData.selectedResult;
    const odds = betData.odds;
    const potentialGain = amount * odds;
    const createdAt = new Date();

    const newBet: Bet = {
      eventId,
      eventName,
      amount,
      selectedResult,
      odds,
      potentialGain,
      createdAt,
    };

    this.isBetting[eventId] = true;

    this.betService.createBet(eventId, amount, selectedResult).subscribe({
      next: (response) => {
        this.toastr.success('¡Apuesta realizada exitosamente!', 'Éxito');
        this.isBetting[eventId] = false;
        this.bets.push(newBet);
        this.saveBetsToSession();
        this.closeModal();
      },
      error: (error) => {
        this.toastr.error(
          error.error.message || 'Error al realizar la apuesta.',
          'Error'
        );
        this.isBetting[eventId] = false;
      },
    });
  }

  getOdds(event: SportEvent, result: string): number {
    if (!event.markets || event.markets.length === 0) {
      return 0;
    }

    const market = event.markets[0];
    if (!market.marketLines || market.marketLines.length === 0) {
      return 0;
    }

    const outcomes = market.marketLines[0].outcomes;

    let outcomeName = '';
    if (result === '1') {
      outcomeName = event.competitorHome.competitorName.es;
    } else if (result === 'X') {
      outcomeName = 'empate';
    } else if (result === '2') {
      outcomeName = event.competitorAway.competitorName.es;
    }

    const outcome = outcomes.find(
      (o: any) => o.outcomeName.es.toLowerCase() === outcomeName.toLowerCase()
    );

    return outcome ? outcome.odds : 0;
  }

  calculateTotalPotentialGain(): number {
    return this.bets.reduce((total, bet) => total + bet.potentialGain, 0);
  }
}
