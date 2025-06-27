import { Component, OnInit, signal, computed } from '@angular/core';
import { SobreNosotrosServiceService } from '../../Core/services/SobreNosotrosService/sobre-nosotros-service.service';
import { SobreNosotrosDTO } from '../../Core/models/SobreNosotrosDTO';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sobre-nosotros',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sobre-nosotros.component.html',
  styleUrls: ['./sobre-nosotros.component.css'],
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
    {
      next: (data)=>{
        this.datosSobreNosotros = data;
        this.imagenSeleccionada.set(data.imagenes[0]?.url || null);
      }, error: (Error)=>{
        console.error("Hubo un error al obtener la informacion", Error);
      }, complete: ()=>{
        console.log("Se complete la operación");
      }
    }
    );
  }

  seleccionarImagen(url: string) {
    this.imagenSeleccionada.set(url);
  }
}
