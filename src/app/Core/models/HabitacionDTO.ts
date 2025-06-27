import { TipoHabitacionDTO } from "./TipoHabitacionDTO";

export interface HabitacionDTO {
    idHabitacion: number;        // minúscula
    numero: number;              // minúscula
    tipoDeHabitacion: TipoHabitacionDTO;  // minúscula
}