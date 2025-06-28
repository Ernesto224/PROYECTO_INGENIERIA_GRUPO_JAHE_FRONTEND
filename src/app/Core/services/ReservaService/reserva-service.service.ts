import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HabitacionDTO } from '../../models/HabitacionDTO';
import { TipoHabitacionDTO } from '../../models/TipoHabitacionDTO';
import { ReservaCompletaDTO } from '../../models/ReservaCompletaDTO';
import { AlternativaDeReservaDTO } from '../../models/AlternativaDeReservaDTO';
import { HabitacionDisponibleDTO } from '../../models/HabitacionDisponibleDTO';

@Injectable({
  providedIn: 'root'
})
export class ReservaServiceService {

  constructor(private http: HttpClient) { }

  publicidadUrl = 'https://www.hotel-jade-api.somee.com/api/Reserva';

  obtenerHabitacionDisponible(idTipoDeHabitacion: number, fechaLlegada: String, fechaSalida: String): Observable<HabitacionDisponibleDTO | null> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      accept: 'application/json',
    });
    return this.http.get<any>(
      `${this.publicidadUrl}?idTipoHabitacion=${idTipoDeHabitacion}&fechaLlegada=${fechaLlegada}&fechaSalida=${fechaSalida}`,
      { headers: headers }
    ).pipe(
      map(response => {
        if (typeof response === 'string') {
          return null;
        }
        return response as HabitacionDisponibleDTO;
      }),
      catchError(error => {
        return of(null);
      })
    );
  }

  public obtenerAlternativas(idTipoDeHabitacion: number, fechaLlegada: string, fechaSalida: string): Observable<AlternativaDeReservaDTO[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      accept: 'application/json',
    });
    return this.http.get<AlternativaDeReservaDTO[]>(`${this.publicidadUrl}/alternativas?idTipoHabitacion=
      ${idTipoDeHabitacion}&fechaLlegada=${fechaLlegada}&fechaSalida=${fechaSalida}`, { headers: headers });
  }

  cambiarEstadoHabitacion(idHabitacion: number, estado: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      accept: 'application/json',
    });
    return this.http.put<any>(
      `${this.publicidadUrl}?idHabitacion=${idHabitacion}&nuevoEstado=${estado}`,
      { headers }
    );
  }

  agregarReservaCompleta(reserva: ReservaCompletaDTO): Observable<String[]> {
    return this.http.post<String[]>(`${this.publicidadUrl}`, reserva);
  }
}
