import { TipoDeHabitacionDTO } from './TipoDeHabitacionDTO';

export interface AlternativaDeReservaDTO {
  tipoDeHabitacionDTO: TipoDeHabitacionDTO;
  inicio: string; // ISO 8601 string (DateTime)
  fin: string;
}