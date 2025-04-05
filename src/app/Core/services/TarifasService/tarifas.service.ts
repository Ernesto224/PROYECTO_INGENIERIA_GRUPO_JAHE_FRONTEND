import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TipoDeHabitacionDTO } from '../../models/TipoDeHabitacionDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TarifasService {

  private http = inject(HttpClient);
  private urlBase = "https://localhost:7169/api/Tarifas";

  constructor() { }

  public obtenerTarifas = () : Observable<TipoDeHabitacionDTO[]> => {
    return this.http.get<TipoDeHabitacionDTO[]>(this.urlBase);
  }

}
