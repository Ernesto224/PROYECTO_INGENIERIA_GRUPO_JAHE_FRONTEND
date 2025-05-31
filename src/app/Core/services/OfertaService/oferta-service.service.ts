import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { OfertaDTO } from '../../models/OfertaDTO';

@Injectable({
  providedIn: 'root'
})
export class OfertaServiceService {

  constructor(private http: HttpClient) { }

  ofertaUrl = 'https://localhost:7169/api/Oferta';

  obtenerOfertasActivas(): Observable<OfertaDTO[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      accept: 'application/json',
    });
    return this.http.get<OfertaDTO[]>(
      `${this.ofertaUrl}`,
      { headers }
    );
  }

}
