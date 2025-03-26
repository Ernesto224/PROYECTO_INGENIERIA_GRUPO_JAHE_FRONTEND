import { Component, inject } from '@angular/core';
import { CategoriasService } from '../../Core/services/categorias.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

  //como ejemplo
  categoriasService = inject(CategoriasService);

}
