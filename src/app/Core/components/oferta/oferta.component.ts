import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfertaServiceService } from '../../services/OfertaService/oferta-service.service';
import { OfertaDTO } from '../../models/OfertaDTO';

@Component({
  selector: 'app-oferta',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './oferta.component.html',
  styleUrl: './oferta.component.css'
})
export class OfertaComponent {

  constructor(private ofertaService: OfertaServiceService) { }

  datosOfertas: OfertaDTO[] = [];

  currentSlide: number = 0;
  private intervalo: any;

  ngOnInit(): void {
    this.obtenerDatoPublicidades();
    this.iniciarCarrusel();

  }

  obtenerDatoPublicidades() {
    this.ofertaService.obtenerOfertasActivas().subscribe(
      (response: OfertaDTO[]) => {
        this.datosOfertas = response;
      },
      (error: any) => {
        // manejar error
      }
    )
  };


  // Funciones para el carrusel
  moveSlide(direction: number): void {
    if (!this.datosOfertas?.length) {
      return;
    }

    this.currentSlide += direction;
    if (this.currentSlide >= this.datosOfertas.length) {
      this.currentSlide = 0;
    } else if (this.currentSlide < 0) {
      this.currentSlide = this.datosOfertas.length - 1;
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
