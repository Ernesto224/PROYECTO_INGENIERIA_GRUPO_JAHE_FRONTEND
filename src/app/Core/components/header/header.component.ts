import { Component, HostListener } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { OfertaComponent } from '../oferta/oferta.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule, OfertaComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

 


}
