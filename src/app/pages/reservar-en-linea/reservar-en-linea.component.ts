import { Component } from '@angular/core';
import { ChangeDetectionStrategy, signal } from '@angular/core';
import { ReservaServiceService } from '../../Core/services/ReservaService/reserva-service.service';
import { HabitacionDTO } from '../../Core/models/HabitacionDTO';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClienteDTO } from '../../Core/models/ClienteDTO';
import { ReservaDTO } from '../../Core/models/ReservaDTO';
import { ReservaCompletaDTO } from '../../Core/models/ReservaCompletaDTO';
import { AlternativaDeReservaDTO } from '../../Core/models/AlternativaDeReservaDTO';
import { finalize } from 'rxjs/operators';
import { TipoHabitacionDTO } from '../../Core/models/TipoHabitacionDTO';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';

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
    FormsModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatExpansionModule],
  providers: [ReservaServiceService],
  templateUrl: './reservar-en-linea.component.html',
  styleUrl: './reservar-en-linea.component.css'
})

export class ReservarEnLineaComponent {

  public listaDeAlternativas!: AlternativaDeReservaDTO[];

  constructor(private reservaService: ReservaServiceService) { }

  pasoActualReserva: number = 1

  idReservas: String[] = [];

  filtroFechas = (d: Date | null): boolean => {
    if (!d || !this.fechaLlegada) return true;
    return d > new Date(this.fechaLlegada);
  };

  readonly panelOpenState = signal(false);
  isLoading = false;
  errorMessage: string | null = null;

  fechaActual = new Date().toISOString().split('T')[0];

  mostrarFormularioCliente = false;

  columnasMostradas: string[] = ['habitacion', 'tipo', 'fechas', 'dias', 'subtotal', 'acciones'];

  dataSource = new MatTableDataSource<ItemFactura>([]);

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
    this.dataSource = new MatTableDataSource<ItemFactura>(this.factura.items);
  }

  obtenerHabitacionDisponible() {

    if (this.factura.items.length >= 3) {
      this.errorMessage = 'Has alcanzado el máximo de 3 habitaciones por reserva';
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    this.reservaService.obtenerHabitacionDisponible(
      this.tipoHabitacionSeleccionado,
      this.formatoFecha(this.fechaLlegada),
      this.formatoFecha(this.fechaSalida)
    ).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe({
      next: (response) => {
        if (response) {
          this.habitacionEnReserva = response;
          this.agregarAFactura(response);
          this.actualizarTabla();
        } else {
          this.obtenerAlternativas();
          this.errorMessage = 'No hay habitaciones disponibles para las fechas seleccionadas.';
        }
      },
      error: (error) => {
        this.errorMessage = 'Ocurrió un error al buscar habitaciones. Por favor intente nuevamente.';
      }
    });
  }

  public obtenerAlternativas = () => {
    this.reservaService.obtenerAlternativas(
      this.tipoHabitacionSeleccionado,
      this.formatoFecha(this.fechaLlegada),
      this.formatoFecha(this.fechaSalida)
    ).subscribe({
      next: (response) => {
        this.listaDeAlternativas = response;
        console.log(response);
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

  actualizarTabla() {
    this.dataSource.data = [...this.factura.items];
  }

  agregarAFactura(habitacion: HabitacionDTO) {
    if (this.factura.items.some(item => item.habitacion.idHabitacion === habitacion.idHabitacion)) {
      return;
    }

    const nuevosItems = [...this.factura.items];

    nuevosItems.push({
      habitacion,
      tarifaDiaria: habitacion?.tipoDeHabitacion?.tarifaDiaria,
      cantidadDias: this.calcularDias(),
      fechaLlegada: this.fechaLlegada,
      fechaSalida: this.fechaSalida
    });

    this.factura.items = nuevosItems;
    this.calcularTotal();
    this.actualizarTabla();
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
      this.actualizarTabla();

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
        this.pasoActualReserva = 3;
        this.idReservas = resultado;
        this.limpiarDatos();

      } else {
        this.errorMessage = 'Ocurrió un error al procesar la reserva';
      }

    } catch (error) {
      this.errorMessage = 'Error de conexión con el servidor. Intente nuevamente.';
    } finally {
      this.isLoading = false;
    }
  }

  limpiarDatos() {
    this.habitacionEnReserva = {
      idHabitacion: 0,
      numero: 0,
      tipoDeHabitacion: {
        idTipoDeHabitacion: 0,
        nombre: '',
        tarifaDiaria: 0,
      }
    };
    this.fechaLlegada = '';
    this.fechaSalida = '';
    this.tipoHabitacionSeleccionado = 0;
    this.dataSource.data = [];
    this.mostrarFormularioCliente = false;
    this.factura.items.forEach(item => {
      this.removerDeFactura(item.habitacion.idHabitacion);
    });
  }

  limpiarDatosCliente() {
    this.cliente = {
      Nombre: '',
      Apellidos: '',
      Email: '',
      TarjetaDePago: ''
    };
  }

  private formatoFecha(fecha: string): string {

    const fechaObj = new Date(fecha);

    const year = fechaObj.getFullYear();
    const month = String(fechaObj.getMonth() + 1).padStart(2, '0');
    const day = String(fechaObj.getDate()).padStart(2, '0');

    const fechaFormateada = `${year}-${month}-${day}`;

    return fechaFormateada;
  }

}