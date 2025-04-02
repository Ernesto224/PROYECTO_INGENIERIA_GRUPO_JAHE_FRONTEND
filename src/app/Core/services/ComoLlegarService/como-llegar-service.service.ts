import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable'
import { SobreNosotrosDTO } from '../../models/SobreNosotrosDTO';
@Injectable({
  providedIn: 'root'
})
export class ComoLlegarServiceService {

  constructor(private http: HttpClient) { }
  comoLlegarUrl = 'https://localhost:7169/api/SobreNosotros';
  
  obtenerComoLlegar(): Observable<any> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        accept: 'application/json',
      });
      return this.http.get<any>(
        `${this.comoLlegarUrl}`,
        { headers }
      );
    }
}
