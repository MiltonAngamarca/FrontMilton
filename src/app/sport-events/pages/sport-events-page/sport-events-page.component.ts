import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { SportEventsFilterComponent } from '../../components/sport-events-filter/sport-events-filter.component';
import { SportEventsTableComponent } from '../../components/sport-events-table/sport-events-table.component';

@Component({
  selector: 'app-sport-events-page',
  standalone: true,
  templateUrl: './sport-events-page.component.html',
  imports: [SportEventsFilterComponent, SportEventsTableComponent],
})
export class SportEventsPageComponent implements OnInit {
  events: any[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.events = this.authService.getSportEvents();
  }
}
