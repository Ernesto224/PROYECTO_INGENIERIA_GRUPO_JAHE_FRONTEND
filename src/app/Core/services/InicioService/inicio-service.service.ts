import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class InicioServiceService {

  constructor(private http: HttpClient) { }

  homeUrl = 'https://localhost:7169/api/Home';

  obtenerDatosHome(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      accept: 'application/json',
    });
    return this.http.get<any>(
      `${this.homeUrl}`,
      { headers }
    );
  }

}
