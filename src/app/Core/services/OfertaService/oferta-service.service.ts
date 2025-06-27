import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { OfertaDTO } from '../../models/OfertaDTO';

@Injectable({
  providedIn: 'root'
})
export class OfertaServiceService {

  constructor(private http: HttpClient) { }

  ofertaUrl = 'https://www.hotel-jade-api.somee.com/api/Oferta';

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
