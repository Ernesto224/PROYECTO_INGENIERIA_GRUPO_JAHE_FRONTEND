import { Component, OnInit } from '@angular/core';
import { ComoLlegarServiceService } from '../../Core/services/ComoLlegarService/como-llegar-service.service';
import { DireccionDTO } from '../../Core/models/DireccionDTO';
import { MapComponent } from '../../Core/components/map/map.component';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-como-llegar',
  standalone: true,
  imports: [MapComponent, MatIconModule, CommonModule],
  templateUrl: './como-llegar.component.html',
  styleUrls: ['./como-llegar.component.css']
})
export class ComoLlegarComponent implements OnInit {
  datosDireccion!: DireccionDTO;

  constructor(private comoLlegarService: ComoLlegarServiceService) {}

  ngOnInit() {
    this.obtenerDatosComoLlegar();
  }

  obtenerDatosComoLlegar() {
    this.comoLlegarService.obtenerComoLlegar().subscribe({
      next: (response: DireccionDTO) => {
        this.datosDireccion = response;
      },
      error: (err) => {
        console.error('Error al obtener los datos:', err);
      },
    });
  }
}