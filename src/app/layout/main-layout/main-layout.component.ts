import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, OnInit } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet, Router } from '@angular/router';
import { HeaderComponent } from '../../Core/components/header/header.component';
import { SidebarComponent } from '../../Core/components/sidebar/sidebar.component';
import { FooterComponent } from "../../Core/components/footer/footer.component";
import { PublicidadComponent } from '../../Core/components/publicidad/publicidad.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterModule, CommonModule, HeaderComponent, SidebarComponent, PublicidadComponent, FooterComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent implements OnInit {

  router = inject(Router);

  ngOnInit(): void {
    
  }



  isMobile: boolean = window.innerWidth <= 800;
  menuOpen: boolean = false;

  toggleMenu() {
      this.menuOpen = !this.menuOpen;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
      this.isMobile = window.innerWidth <= 800;
      if (!this.isMobile) {
          this.menuOpen = false; // Ocultar menú si vuelve a una resolución grande
      }
  }

}
