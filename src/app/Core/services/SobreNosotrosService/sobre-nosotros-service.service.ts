import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable'
import { SobreNosotrosDTO } from '../../models/SobreNosotrosDTO';

@Injectable({
  providedIn: 'root'
})
export class SobreNosotrosServiceService {

  constructor(private http: HttpClient) { }
  sobreNosotrosUrl = 'http://www.hotel-jade-api.somee.com/api/SobreNosotros';
  
  obtenerDatosSobreNosotros(): Observable<SobreNosotrosDTO> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        accept: 'application/json',
      });
      return this.http.get<SobreNosotrosDTO>(
        `${this.sobreNosotrosUrl}`,
        { headers }
      );
    }
}
