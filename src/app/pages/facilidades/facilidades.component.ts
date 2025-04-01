import { Component, OnInit } from '@angular/core';
import { FacilidadesService } from '../../Core/services/FacilidadesService/facilidades.service';
import { FacilidadDTO } from '../../Core/models/FacilidadDTO';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-facilidades',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './facilidades.component.html',
  styleUrl: './facilidades.component.css'
})
export class FacilidadesComponent implements OnInit {
  
  public facilidades!: FacilidadDTO[]; // Cambia el tipo según la estructura de tus datos

  constructor(private facilidadesService: FacilidadesService) { }

  ngOnInit(): void {
    this.obtenerDatosFacilidades();
  }

  private obtenerDatosFacilidades = () => {
    // Llama al servicio para obtener los datos de las instalaciones y atractivos
    this.facilidadesService.VerInstalacionesYAtractivos().subscribe({
      next: respuesta => (this.facilidades = respuesta),
      error: error => console.error('Error en la petición:', error),
    });
    // Asigna los datos a la variable de clase
  }

}
