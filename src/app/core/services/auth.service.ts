import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SportEvent } from '../../models/sport-event.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  login(
    credentials: any
  ): Observable<{ token: string; sportEvents: { data: SportEvent[] } }> {
    return this.http.post<{
      token: string;
      sportEvents: { data: SportEvent[] };
    }>(`${this.apiUrl}/login`, credentials);
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  saveSportEvents(events: SportEvent[]): void {
    localStorage.setItem('sportEvents', JSON.stringify(events));
  }

  getSportEvents(): SportEvent[] {
    const events = localStorage.getItem('sportEvents');
    return events ? JSON.parse(events) : [];
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('sportEvents');
  }
}
