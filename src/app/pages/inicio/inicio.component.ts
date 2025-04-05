import { Component, OnInit } from '@angular/core';
import { InicioServiceService } from '../../Core/services/InicioService/inicio-service.service';
import { Home } from '../../Core/models/HomeDTO';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})

export class InicioComponent implements OnInit {

  constructor(private inicioService: InicioServiceService) { }

  datosHome!: Home;

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
