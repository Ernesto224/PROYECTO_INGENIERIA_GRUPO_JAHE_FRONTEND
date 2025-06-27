import { TipoDeHabitacionDTO } from "./TipoDeHabitacionDTO";
import { Imagen } from "./ImagenDTO";

export interface OfertaDTO {
    idOferta: number;
    nombre: string;
    porcentaje: number;
    fechaInicio: Date;
    fechaFin: Date;
    imagenUrl: string;
    tipoDeHabitacion: TipoDeHabitacionDTO;
    imagen: Imagen;
}