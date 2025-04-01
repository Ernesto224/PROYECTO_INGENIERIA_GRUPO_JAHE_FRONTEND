import { Component, OnInit, Signal, signal } from '@angular/core';
import { SobreNosotrosServiceService } from '../../Core/services/SobreNosotrosService/sobre-nosotros-service.service';
import { SobreNosotrosDTO } from '../../Core/models/SobreNosotrosDTO';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sobre-nosotros',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sobre-nosotros.component.html',
  styleUrl: './sobre-nosotros.component.css',
})
export class SobreNosotrosComponent implements OnInit {
  datosSobreNosotros!: SobreNosotrosDTO;
  imagenSeleccionada = signal<string | null>(null);

  constructor(private sobreNosotrosService: SobreNosotrosServiceService) {}

  ngOnInit(): void {
    this.obtenerDatosSobreNosotros();
  }

  obtenerDatosSobreNosotros() {
    this.sobreNosotrosService.obtenerDatosSobreNosotros().subscribe(
      (response: SobreNosotrosDTO) => {
        this.datosSobreNosotros = response;
        this.imagenSeleccionada.set(response.imagenes[0]?.url || null);
      }
    );
  }

  seleccionarImagen(url: string) {
    this.imagenSeleccionada.set(url);
  }
}