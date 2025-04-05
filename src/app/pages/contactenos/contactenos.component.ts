import { Component, OnInit, Signal, signal } from '@angular/core';
import { ContactoServiceService } from '../../Core/services/ContactoService/contacto-service.service';
import { ContactoDTO } from '../../Core/models/ContactoDTO';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-contactenos',
  standalone: true,
  imports: [],
  templateUrl: './contactenos.component.html',
  styleUrl: './contactenos.component.css'
})
export class ContactenosComponent {
  datosContacto!: ContactoDTO;
    constructor(private contactoService: ContactoServiceService) {}
  
    ngOnInit(): void {
      this.obtenerDatosContacto();
    }
  
    obtenerDatosContacto() {
      this.contactoService.obtenerDatosContactanos().subscribe(
        (response: ContactoDTO) => {
          this.datosContacto = response;
        }
      );
    }
}
