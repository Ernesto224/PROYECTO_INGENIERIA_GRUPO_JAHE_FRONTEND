import { Component } from '@angular/core';
import { ComoLlegarServiceService } from '../../Core/services/ComoLlegarService/como-llegar-service.service';

@Component({
  selector: 'app-como-llegar',
  standalone: true,
  imports: [],
  templateUrl: './como-llegar.component.html',
  styleUrl: './como-llegar.component.css',
})
export class ComoLlegarComponent {
  urlUbicacion: string = '';
  textoComoLlegar: string =
    'Para llegar al Hotel JAHE, dirígete hacia la zona donde se encuentra ubicado y sigue las indicaciones principales según tu medio de transporte. Si vas en coche, utiliza aplicaciones de navegación como Google Maps para la mejor ruta disponible. Si prefieres el transporte público, identifica las rutas de autobús o metro cercanas que te acerquen al destino. Una vez en la zona, busca señales o referencias cercanas para ubicar fácilmente la entrada del hotel.z';
  constructor(private comoLlegarService: ComoLlegarServiceService) {}
  ngOnOnit(): void {
    this.obtenerDatosComoLlegar();
  }
  obtenerDatosComoLlegar() {
    this.comoLlegarService.obtenerComoLlegar().subscribe();
  }
}
