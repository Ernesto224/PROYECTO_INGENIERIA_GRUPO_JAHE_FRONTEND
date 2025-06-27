import { Component, OnInit, computed } from '@angular/core';
import { ComoLlegarServiceService } from '../../Core/services/ComoLlegarService/como-llegar-service.service';
import { DireccionDTO } from '../../Core/models/DireccionDTO';
import { MapComponent } from '../../Core/components/map/map.component';

@Component({
  selector: 'app-como-llegar',
  standalone: true,
  imports: [MapComponent],
  templateUrl: './como-llegar.component.html',
  styleUrls: ['./como-llegar.component.css'],
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
        console.log(this.datosDireccion);
      },
      error: (err) => {
        console.error('Error al obtener los datos:', err);
      },
    });
  }
}
