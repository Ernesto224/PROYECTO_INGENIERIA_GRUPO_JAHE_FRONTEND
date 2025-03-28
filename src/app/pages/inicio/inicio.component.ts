import { Component, inject, OnInit } from '@angular/core';
import { InicioServiceService } from '../../Core/services/InicioService/inicio-service.service';

export interface Imagen {
  idImagen: number;
  url: string;
}

export interface Home {
  idHome: number;
  descripcion: string;
  imagen: Imagen;
}


@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})

export class InicioComponent implements OnInit {

  constructor(private inicioService: InicioServiceService) { }

  datosHome: Home | null = null;

  ngOnInit(): void {
    this.obtenerDatosHome();
  }

  obtenerDatosHome() {
    this.inicioService.obtenerDatosHome().subscribe(
      (response: Home) => {
        this.datosHome = response;
      },
      (error: any) => {
        // Manejar error
      }
   )};



}
