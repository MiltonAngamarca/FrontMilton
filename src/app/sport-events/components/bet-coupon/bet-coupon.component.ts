import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Bet } from '../../../models/bet.model'; 

@Component({
  selector: 'app-bet-coupon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bet-coupon.component.html',

})
export class BetCouponComponent {
  @Input() bets: Bet[] = [];
  @Input() totalPotentialGain: number = 0;
}
