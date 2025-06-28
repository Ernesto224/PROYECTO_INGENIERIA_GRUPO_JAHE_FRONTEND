import { Component, OnInit } from '@angular/core';
import { ContactoServiceService } from '../../Core/services/ContactoService/contacto-service.service';
import { ContactoDTO } from '../../Core/models/ContactoDTO';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-contactenos',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './contactenos.component.html',
  styleUrls: ['./contactenos.component.css']
})
export class ContactenosComponent implements OnInit {
  datosContacto!: ContactoDTO;

  constructor(private contactoService: ContactoServiceService) {}

  ngOnInit(): void {
    this.obtenerDatosContacto();
  }

  obtenerDatosContacto() {
    this.contactoService.obtenerDatosContactanos().subscribe({
      next: (response: ContactoDTO) => {
        this.datosContacto = response;
      },
      error: (error) => {
        console.error('Error al obtener datos de contacto:', error);
      }
    });
  }
}