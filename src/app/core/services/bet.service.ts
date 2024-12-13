// src/app/core/services/bet.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BetResponse } from '../../models/bet.model'; // Import correcto

@Injectable({
  providedIn: 'root',
})
export class BetService {
  private apiUrl = 'http://localhost:3000/api/bets'; // Actualiza la URL según tu configuración

  constructor(private http: HttpClient) {}

  createBet(
    eventId: string,
    amount: number,
    selectedResult: string
  ): Observable<BetResponse> {
    const betData = { eventId, amount, selectedResult };

    // Obtener el token de autenticación desde un servicio o localStorage
    const token = localStorage.getItem('token'); // Ajusta según tu implementación

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    return this.http.post<BetResponse>(this.apiUrl, betData, { headers });
  }

  // Obtener todas las apuestas del usuario
  getUserBets(): Observable<BetResponse[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<BetResponse[]>(this.apiUrl, { headers });
  }
}
