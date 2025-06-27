import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class PublicidadServiceService {

  constructor(private http: HttpClient) { }

  publicidadUrl = 'http://www.hotel-jade-api.somee.com/api/Publicidad';
  
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
