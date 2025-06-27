import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ContactoDTO } from '../../models/ContactoDTO';

@Injectable({
  providedIn: 'root',
})
export class ContactoServiceService {
  constructor(private http: HttpClient) {}
  contactanosUrl = 'http://www.hotel-jade-api.somee.com/api/Contacto';

  obtenerDatosContactanos(): Observable<ContactoDTO> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      accept: 'application/json',
    });
    return this.http.get<ContactoDTO>(`${this.contactanosUrl}`, {
      headers,
    });
  }
}
