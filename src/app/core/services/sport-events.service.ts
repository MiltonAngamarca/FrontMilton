import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SportEventsService {
  getEvents(): any[] {
    const events = localStorage.getItem('sportEvents');
    return events ? JSON.parse(events) : [];
  }
}
