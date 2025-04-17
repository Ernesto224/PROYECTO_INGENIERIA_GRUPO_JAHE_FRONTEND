import { Component } from '@angular/core';
import { ReservaServiceService } from '../../Core/services/ReservaService/reserva-service.service';
import { HabitacionDTO } from '../../Core/models/HabitacionDTO';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClienteDTO } from '../../Core/models/ClienteDTO';
import { ReservaDTO } from '../../Core/models/ReservaDTO';
import { ReservaCompletaDTO } from '../../Core/models/ReservaCompletaDTO';
import { finalize } from 'rxjs/operators';
import { TipoHabitacionDTO } from '../../Core/models/TipoHabitacionDTO';


export interface ItemFactura {
  habitacion: HabitacionDTO;
  tarifaDiaria: number;
  cantidadDias: number;
}

export interface Factura {
  items: ItemFactura[];
  total: number;
}

@Component({
  selector: 'app-reservar-en-linea',
  standalone: true,
  imports: [CommonModule,
    FormsModule],
  providers: [ReservaServiceService],
  templateUrl: './reservar-en-linea.component.html',
  styleUrl: './reservar-en-linea.component.css'
})

export class ReservarEnLineaComponent {

  constructor(private reservaService: ReservaServiceService) { }

  isLoading = false; 
  errorMessage: string | null = null; 

  fechaActual = new Date().toISOString().split('T')[0];

  mostrarFormularioCliente = false;

  cliente: ClienteDTO = {
    Nombre: '',
    Apellidos: '',
    Email: '',
    TarjetaDePago: ''
  };

  factura: {
    items: {
      habitacion: HabitacionDTO,
      tarifaDiaria: number,
      cantidadDias: number,
      fechaLlegada: string,
      fechaSalida: string
    }[],
    total: number
  } = { items: [], total: 0 };

  tiposDeHabitacion: TipoHabitacionDTO[] = [];

  fechaLlegada: string = '';
  fechaSalida: string = '';

  tipoHabitacionSeleccionado: number = 0;

  habitacionEnReserva: HabitacionDTO = {
    idHabitacion: 0,
    numero: 0,
    tipoDeHabitacion: {
      idTipoDeHabitacion: 0,
      nombre: '',
      tarifaDiaria: 0,

    }
  };

  ngOnInit() {
    this.obtenerTiposHabitacion();
  }

  obtenerHabitacionDisponible() {
    this.isLoading = true;
    this.errorMessage = null;
  
    this.reservaService.obtenerHabitacionDisponible(
      this.tipoHabitacionSeleccionado,
      this.fechaLlegada,
      this.fechaSalida
    ).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: (response) => {
        if (response) {
          this.habitacionEnReserva = response;
          this.agregarAFactura(response);
        } else {
          this.errorMessage = 'No hay habitaciones disponibles para las fechas seleccionadas.';
        }
      },
      error: (error) => {
        this.errorMessage = 'Ocurrió un error al buscar habitaciones. Por favor intente nuevamente.';
      }
    });
  }

  obtenerTiposHabitacion() {
    this.reservaService.obtenerTiposDeHabitacion().subscribe(
      (response: any) => {
        this.tiposDeHabitacion = response;
      },
      (error: any) => {
      }
    );
  }

  agregarAFactura(habitacion: HabitacionDTO) {
    if (this.factura.items.some(item => item.habitacion.idHabitacion === habitacion.idHabitacion)) {
      return; 
    }

    this.factura.items.push({
      habitacion,
      tarifaDiaria: habitacion?.tipoDeHabitacion?.tarifaDiaria,
      cantidadDias:  this.calcularDias(),
      fechaLlegada: this.fechaLlegada,
      fechaSalida: this.fechaSalida
    });

    this.calcularTotal();
  }

  calcularDias(): number {
    if (!this.fechaLlegada || !this.fechaSalida) return 1;
    const diff = new Date(this.fechaSalida).getTime() - new Date(this.fechaLlegada).getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  calcularTotal() {
    this.factura.total = this.factura.items.reduce(
      (sum, item) => sum + (item.tarifaDiaria * item.cantidadDias), 0);
  }

  async removerDeFactura(idHabitacion: number) {
    const item = this.factura.items.find(i => i.habitacion.idHabitacion === idHabitacion);
    if (!item) return;

    try {
      await this.reservaService.cambiarEstadoHabitacion(
        idHabitacion, 
        'DISPONIBLE'
      ).toPromise();

      this.factura.items = this.factura.items.filter(
        i => i.habitacion.idHabitacion !== idHabitacion);
      this.calcularTotal();

    } catch (error) {
      // manejar error
    }
  }

  async enviarReservaCompleta() {

    this.isLoading = true;
    this.errorMessage = null;

    const reservaCompleta: ReservaCompletaDTO = {
      reservasDTO: this.factura.items.map(item => ({
        fechaLlegada: new Date(item.fechaLlegada),
        fechaSalida: new Date(item.fechaSalida),
        idTipoDeHabitacion: item.habitacion.tipoDeHabitacion.idTipoDeHabitacion,
        idHabitacion: item.habitacion.idHabitacion
      })),
      clienteDTO: this.cliente
    };

    try {
      const resultado = await this.reservaService.agregarReservaCompleta(reservaCompleta).toPromise();
      this.mostrarFormularioCliente = false;
      this.factura = { items: [], total: 0 }; 

      if (resultado) {
        this.mostrarFormularioCliente = false;
        this.factura = { items: [], total: 0 };

      } else {
        this.errorMessage = 'Ocurrió un error al procesar la reserva';
      }

    } catch (error) {
      this.errorMessage = 'Error de conexión con el servidor. Intente nuevamente.';
    } finally {
      this.isLoading = false;  // Desactivar carga siempre
    }
  }

}