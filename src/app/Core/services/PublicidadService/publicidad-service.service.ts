import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class PublicidadServiceService {

  constructor(private http: HttpClient) { }

  publicidadUrl = 'https://localhost:7169/api/Publicidad';
  
  obtenerDatosPublicidades(): Observable<any[]> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        accept: 'application/json',
      });
      return this.http.get<any[]>(
        `${this.publicidadUrl}`,
        { headers }
      );
    }
}
