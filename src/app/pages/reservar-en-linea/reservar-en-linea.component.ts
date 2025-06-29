import { Component, OnDestroy, ViewChild } from '@angular/core';
import { ChangeDetectionStrategy, signal } from '@angular/core';
import { ReservaServiceService } from '../../Core/services/ReservaService/reserva-service.service';
import { TarifasService } from '../../Core/services/TarifasService/tarifas.service';
import { HabitacionDTO } from '../../Core/models/HabitacionDTO';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormsModule } from '@angular/forms';
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
import { MatStepperModule, MatStepper } from '@angular/material/stepper';
import { OnInit, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HabitacionDisponibleDTO } from '../../Core/models/HabitacionDisponibleDTO';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OfertaDTO } from '../../Core/models/OfertaDTO';
import { ComicBubbleComponent } from '../../Core/components/comic-bubble/comic-bubble.component';


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
  imports: [
    CommonModule,
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
    MatExpansionModule,
    MatStepperModule,
    ReactiveFormsModule,
    ComicBubbleComponent
  ],
  providers: [ReservaServiceService],
  templateUrl: './reservar-en-linea.component.html',
  styleUrl: './reservar-en-linea.component.css'
})
export class ReservarEnLineaComponent implements OnInit, OnDestroy {
  @ViewChild('stepper') stepper!: MatStepper;

  reservaForm!: FormGroup;
  clienteForm!: FormGroup;

  constructor(
    private reservaService: ReservaServiceService,
    private tarifasService: TarifasService,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) { }

  public listaDeAlternativas!: AlternativaDeReservaDTO[];

  idReservas: String[] = [];

  filtroFechas = (d: Date | null): boolean => {
    if (!d || !this.fechaLlegada) return true;
    return d > new Date(this.fechaLlegada);
  };

  readonly panelOpenState = signal(false);

  isLoading = false;
  errorMessage: string | null = null;

  fechaActual = new Date().toISOString().split('T')[0];

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
      precioTotal: number,
      cantidadDias: number,
      fechaLlegada: string,
      fechaSalida: string,
      oferta?: OfertaDTO;
      showBubble?: boolean;
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

  @HostListener('window:beforeunload', ['$event'])
  handleBeforeUnload(event: Event) {
    this.liberarHabitaciones();
  }

  @HostListener('window:pagehide', ['$event'])
  handlePageHide(event: Event) {
    this.liberarHabitaciones();
  }

  @HostListener('window:unload', ['$event'])
  handleUnload(event: Event) {
    this.liberarHabitaciones();
  }

  ngOnInit() {
    this.obtenerTiposHabitacion();
    this.dataSource = new MatTableDataSource<ItemFactura>(this.factura.items);

    this.reservaForm = this.fb.group({
      tipoHabitacion: ['', Validators.required],
      fechaLlegada: ['', Validators.required],
      fechaSalida: ['', Validators.required]
    });

    this.clienteForm = this.fb.group({
      nombre: ['', Validators.required],
      apellidos: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tarjetaDePago: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3,4}$/)]],
      fechaVencimiento: ['', [
        Validators.required,
        Validators.pattern(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/),
        this.validateCardExpiry.bind(this)
      ]]
    });

    this.reservaForm.get('tipoHabitacion')?.valueChanges.subscribe(value => {
      this.tipoHabitacionSeleccionado = value;
    });

    this.reservaForm.get('fechaLlegada')?.valueChanges.subscribe(value => {
      this.fechaLlegada = value;
      this.reservaForm.get('fechaSalida')?.setValue('');
    });

    this.reservaForm.get('fechaSalida')?.valueChanges.subscribe(value => {
      this.fechaSalida = value;
    });

    this.clienteForm.get('nombre')?.valueChanges.subscribe(value => {
      this.cliente.Nombre = value;
    });

    this.clienteForm.get('apellidos')?.valueChanges.subscribe(value => {
      this.cliente.Apellidos = value;
    });

    this.clienteForm.get('email')?.valueChanges.subscribe(value => {
      this.cliente.Email = value;
    });

    this.clienteForm.get('tarjetaDePago')?.valueChanges.subscribe(value => {
      this.cliente.TarjetaDePago = value;
    });
  }

  ngOnDestroy(): void {
    this.liberarHabitaciones();
  }

  formatCreditCard(event: any) {
    let value = event.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');

    if (value.length > 0) {
      value = value.match(new RegExp('.{1,4}', 'g')).join(' ');
    }

    event.target.value = value;
    this.clienteForm.get('tarjetaDePago')?.setValue(value.replace(/\s/g, ''));
  }

  formatExpiryDate(event: any) {
    let value = event.target.value.replace(/\D/g, '');

    if (value.length > 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }

    event.target.value = value;
    this.clienteForm.get('fechaVencimiento')?.setValue(value);
  }

  validateCardExpiry(control: AbstractControl): { [key: string]: boolean } | null {
    const value = control.value;
    if (!value || !value.match(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/)) {
      return null;
    }

    const [month, year] = value.split('/');
    const expiryDate = new Date(parseInt(`20${year}`), parseInt(month));
    const currentDate = new Date();

    const expiryYearMonth = new Date(expiryDate.getFullYear(), expiryDate.getMonth(), 1);
    const currentYearMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

    if (expiryYearMonth < currentYearMonth) {
      return { 'expired': true };
    }

    return null;
  }

  obtenerHabitacionDisponible() {
    if (this.factura.items.length >= 3) {
      this.errorMessage = 'Has alcanzado el máximo de 3 habitaciones por reserva';
      return;
    }

    if (this.reservaForm.invalid) {
      this.reservaForm.markAllAsTouched();
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
          console.log('Habitación disponible:', response);
          this.habitacionEnReserva = response.habitacionDTO;
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
      },
      error: (error) => {
        this.errorMessage = 'Ocurrió un error al buscar habitaciones. Por favor intente nuevamente.';
      }
    });
  }

  obtenerTiposHabitacion() {
    this.tarifasService.obtenerTarifas().subscribe(
      (response: any) => {
        this.tiposDeHabitacion = response;
      },
      (error: any) => {
        console.error('Error al obtener tipos de habitación', error);
      }
    );
  }

  actualizarTabla() {
    this.dataSource.data = [...this.factura.items];
  }

  agregarAFactura(habitacionDisponible: HabitacionDisponibleDTO) {
    const habitacion = habitacionDisponible.habitacionDTO;
    if (this.factura.items.some(item => item.habitacion.idHabitacion === habitacion.idHabitacion)) {
      return;
    }

    const nuevosItems = [...this.factura.items];

    nuevosItems.push({
      habitacion,
      tarifaDiaria: habitacion?.tipoDeHabitacion?.tarifaDiaria,
      precioTotal: habitacionDisponible.precioTotal,
      cantidadDias: this.calcularDias(),
      fechaLlegada: this.fechaLlegada,
      fechaSalida: this.fechaSalida,
      oferta: habitacionDisponible.ofertaDTO,
      showBubble: false // Inicializar como false
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
      console.error('Error al cambiar estado de habitación', error);
    }
  }

  async enviarReservaCompleta() {
    if (this.clienteForm.invalid) {
      this.clienteForm.markAllAsTouched();
      return;
    }

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
      this.factura = { items: [], total: 0 };

      if (resultado) {
        this.idReservas = resultado;
        this.stepper.next();
      } else {
        this.errorMessage = 'Ocurrió un error al procesar la reserva';
      }

    } catch (error) {
      this.errorMessage = 'Error de conexión con el servidor. Intente nuevamente.';
    } finally {
      this.isLoading = false;
    }
  }

  resetearStepper() {
    this.limpiarDatos();
    this.limpiarDatosCliente();
    this.stepper.reset();
  }

  limpiarDatos() {
    this.errorMessage = null;
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
    this.factura.items.forEach(item => {
      this.removerDeFactura(item.habitacion.idHabitacion);
    });
    this.reservaForm.reset();
  }

  limpiarDatosCliente() {
    this.errorMessage = null;
    this.cliente = {
      Nombre: '',
      Apellidos: '',
      Email: '',
      TarjetaDePago: ''
    };
    this.clienteForm.reset();
  }

  bubblePosition = { x: 0, y: 0 };
  hoverTimeout: any;

  showOfertaBubble(item: any, event: MouseEvent) {
    clearTimeout(this.hoverTimeout);

    const cell = event.currentTarget as HTMLElement;
    const rect = cell.getBoundingClientRect();
    const tableRect = cell.closest('mat-table')?.getBoundingClientRect();

    // Calcula la posición relativa a la tabla
    this.bubblePosition = {
      x: rect.left - (tableRect?.left || 0) + (rect.width / 2) - 100,
      y: rect.top - (tableRect?.top || 0) - 120 
    };

    item.showBubble = true;
  }

  hideOfertaBubble(item: any) {
    this.hoverTimeout = setTimeout(() => {
      item.showBubble = false;
    }, 200);
  }

  getOfertaMessage(item: any): string {
    if (item.oferta) {
      return `¡OFERTA APLICADA!\n${item.oferta.nombre}\n\n Descuento: ${item.oferta.porcentaje}%`;
    }
    return 'No hay ofertas aplicadas\npara esta habitación';
  }

  private liberarHabitaciones(): void {
    this.factura.items.forEach(item => {
      this.reservaService.cambiarEstadoHabitacion(
        item.habitacion.idHabitacion,
        'DISPONIBLE'
      ).subscribe({
        next: () => console.log(`Habitación ${item.habitacion.numero} liberada`),
        error: (error) => console.error(`Error al liberar habitación ${item.habitacion.numero}`, error)
      });
    });
  }

  private formatoFecha(fecha: string): string {
    const fechaObj = new Date(fecha);
    const year = fechaObj.getFullYear();
    const month = String(fechaObj.getMonth() + 1).padStart(2, '0');
    const day = String(fechaObj.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}