import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { FacilidadDTO } from '../../models/FacilidadDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacilidadesService {

  private http = inject(HttpClient);
  private urlBase = "https://www.hotel-jade-api.somee.com/api/Facilidad";

  constructor() { }

  public VerInstalacionesYAtractivos = () : Observable<FacilidadDTO[]> => {
    return this.http.get<FacilidadDTO[]>(this.urlBase);
  }
}
