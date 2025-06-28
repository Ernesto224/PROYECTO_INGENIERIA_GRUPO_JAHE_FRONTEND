import { Component, OnInit } from '@angular/core';
import { TarifasService } from '../../Core/services/TarifasService/tarifas.service';
import { TipoDeHabitacionDTO } from '../../Core/models/TipoDeHabitacionDTO';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-tarifas',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './tarifas.component.html',
  styleUrls: ['./tarifas.component.css']
})
export class TarifasComponent implements OnInit {
  listaTarifas: TipoDeHabitacionDTO[] = [];

  constructor(private tarifasService: TarifasService) {}

  ngOnInit(): void {
    this.obtenerTarifas();
  }

  obtenerTarifas() {
    this.tarifasService.obtenerTarifas().subscribe({
      next: (response) => {
        this.listaTarifas = response;
      },
      error: (error) => {
        console.error('Error al obtener tarifas:', error);
      }
    });
  }
}