import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HabitacionDTO } from '../../models/HabitacionDTO';
import { TipoHabitacionDTO } from '../../models/TipoHabitacionDTO';
import { ReservaCompletaDTO } from '../../models/ReservaCompletaDTO';

@Injectable({
  providedIn: 'root'
})
export class ReservaServiceService {

  constructor(private http:HttpClient) { }

  publicidadUrl = 'https://localhost:7169/api/Reserva';
    
  obtenerHabitacionDisponible(idTipoDeHabitacion: number, fechaLlegada: String, fechaSalida: String): Observable<HabitacionDTO | null> {
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
          return response as HabitacionDTO;
        }),
        catchError(error => {
          return of(null);
        })
      );
  }

  obtenerTiposDeHabitacion(): Observable<TipoHabitacionDTO> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        accept: 'application/json',
      });
      return this.http.get<TipoHabitacionDTO>(`${this.publicidadUrl}/tipos-de-habitacion`, { headers });
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

  agregarReservaCompleta(reserva: ReservaCompletaDTO): Observable<boolean> {
    return this.http.post<boolean>(`${this.publicidadUrl}`, reserva);
  }
}
