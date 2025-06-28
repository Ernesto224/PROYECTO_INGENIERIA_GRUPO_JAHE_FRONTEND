import { Component, OnInit } from '@angular/core';
import { InicioServiceService } from '../../Core/services/InicioService/inicio-service.service';
import { Home } from '../../Core/models/HomeDTO';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements OnInit {
  datosHome: Home | null = null;

  constructor(private inicioService: InicioServiceService) { }

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
        console.error('Error al cargar datos de inicio:', error);
      }
    );
  }
}