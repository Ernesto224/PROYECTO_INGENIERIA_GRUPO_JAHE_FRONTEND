import { Component, inject, OnInit } from '@angular/core';
import { TarifasService } from '../../Core/services/TarifasService/tarifas.service';
import { TipoDeHabitacionDTO } from '../../Core/models/TipoDeHabitacionDTO';

@Component({
  selector: 'app-tarifas',
  standalone: true,
  imports: [],
  templateUrl: './tarifas.component.html',
  styleUrl: './tarifas.component.css'
})
export class TarifasComponent implements OnInit {

  tarifasService = inject(TarifasService);
  listaTarifas! : TipoDeHabitacionDTO[];


  ngOnInit(): void {
   this.obtenerTarifas();
  }


  obtenerTarifas(){
    this.tarifasService.obtenerTarifas().subscribe(response => {
      this.listaTarifas = response;
    });
  }

}
