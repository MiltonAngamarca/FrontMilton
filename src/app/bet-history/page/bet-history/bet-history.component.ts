// src/app/bet-history/bet-history.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BetHistoryTableComponent } from '../../components/bet-history-table/bet-history-table.component';
 // Ajusta la ruta según tu estructura

@Component({
  selector: 'app-bet-history',
  standalone: true,
  imports: [CommonModule, BetHistoryTableComponent],
  templateUrl: './bet-history.component.html',
  styleUrls: ['./bet-history.component.scss'],
})
export class BetHistoryComponent {}
