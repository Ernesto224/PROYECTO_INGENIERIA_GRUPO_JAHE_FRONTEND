import { Imagen } from './ImagenDTO';

export interface Home {
  idHome: number;
  descripcion: string;
  imagen?: Imagen;
}