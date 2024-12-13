import { Component, EventEmitter, Output, Input } from '@angular/core';
import { SportEvent } from '../../../models/sport-event.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface BetData {
  event: SportEvent;
}

@Component({
  selector: 'app-bet-modal',
  standalone: true,
  templateUrl: './bet-modal.component.html',
  imports: [FormsModule, CommonModule],
})
export class BetModalComponent {
  @Input() data!: BetData;
  @Output() close = new EventEmitter<void>();
  @Output() submitBet = new EventEmitter<{
    amount: number;
    selectedResult: string;
    odds: number;
  }>();

  amount: number = 0;
  selectedResult: string = '1';

  get selectedOdds(): number {
    if (!this.data || !this.data.event || !this.data.event.markets) {
      return 0;
    }

    const market = this.data.event.markets[0];
    if (!market.marketLines || market.marketLines.length === 0) {
      return 0;
    }

    const outcomes = market.marketLines[0].outcomes;

    let outcomeName = '';
    if (this.selectedResult === '1') {
      outcomeName = this.data.event.competitorHome.competitorName.es;
    } else if (this.selectedResult === 'X') {
      outcomeName = 'empate';
    } else if (this.selectedResult === '2') {
      outcomeName = this.data.event.competitorAway.competitorName.es;
    }

    const selectedOutcome = outcomes.find(
      (o: any) => o.outcomeName.es.toLowerCase() === outcomeName.toLowerCase()
    );

    return selectedOutcome ? selectedOutcome.odds : 0;
  }

  onCancel(): void {
    this.close.emit();
  }

  onSubmit(): void {
    if (this.amount <= 0) {
      return;
    }
    this.submitBet.emit({
      amount: this.amount,
      selectedResult: this.selectedResult,
      odds: this.selectedOdds,
    });
  }
}
