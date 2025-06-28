import { HabitacionDTO } from "./HabitacionDTO";
import { OfertaDTO } from "./OfertaDTO";

export interface HabitacionDisponibleDTO {
    habitacionDTO: HabitacionDTO;
    ofertaDTO: OfertaDTO;
    precioTotal: number;
}