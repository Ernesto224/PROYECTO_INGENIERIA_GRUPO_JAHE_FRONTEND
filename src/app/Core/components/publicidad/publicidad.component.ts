import { Component } from '@angular/core';
import { Publicidad } from '../../models/PublicidadDTO';
import { CommonModule } from '@angular/common';
import { PublicidadServiceService } from '../../services/PublicidadService/publicidad-service.service';

@Component({
  selector: 'app-publicidad',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './publicidad.component.html',
  styleUrl: './publicidad.component.css'
})
export class PublicidadComponent {

  constructor(private publicidadService: PublicidadServiceService) { }

  datosPublicidades: Publicidad[] = [];

  currentSlide: number = 0;
  private intervalo: any;

  ngOnInit(): void {
    this.obtenerDatoPublicidades();
    this.iniciarCarrusel();

  }

  obtenerDatoPublicidades() {
      this.publicidadService.obtenerDatosPublicidades().subscribe(
        (response: Publicidad[]) => {
          this.datosPublicidades = response;
          console.log(this.datosPublicidades);
        },
        (error: any) => {
          // manejar error
        }
     )};



     // Funciones para el carrusel
  moveSlide(direction: number): void {
    if (!this.datosPublicidades?.length) {
      return;
    }

    this.currentSlide += direction;
    if (this.currentSlide >= this.datosPublicidades.length) {
      this.currentSlide = 0;
    } else if (this.currentSlide < 0) {
      this.currentSlide = this.datosPublicidades.length - 1;
    }
  }

  getCarruselStyle(): string {
    return `translateX(-${this.currentSlide * 100}%)`;
  }
  
  iniciarCarrusel() {
    this.intervalo = setInterval(() => {
      this.moveSlide(1);
    }, 3000);
  }
  
  detenerCarrusel() {
    clearInterval(this.intervalo);
  }
  
  ngOnDestroy(): void {
    clearInterval(this.intervalo);
  }

  esPuntoActivo(index: number): boolean {
    return this.currentSlide === index;
  }

}
