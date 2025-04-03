import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable'
import { SobreNosotrosDTO } from '../../models/SobreNosotrosDTO';
import { DireccionDTO } from '../../models/DireccionDTO';
@Injectable({
  providedIn: 'root'
})
export class ComoLlegarServiceService {

  constructor(private http: HttpClient) { }
  comoLlegarUrl = 'https://localhost:7169/api/Direccion';
  
  obtenerComoLlegar(): Observable<DireccionDTO> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        accept: 'application/json',
      });
      return this.http.get<DireccionDTO>(
        `${this.comoLlegarUrl}`,
        { headers }
      );
    }
}
