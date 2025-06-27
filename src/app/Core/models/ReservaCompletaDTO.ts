import { ClienteDTO } from "./ClienteDTO";
import { ReservaDTO } from "./ReservaDTO";

export interface ReservaCompletaDTO {
    reservasDTO: ReservaDTO[];
    clienteDTO: ClienteDTO;
  }