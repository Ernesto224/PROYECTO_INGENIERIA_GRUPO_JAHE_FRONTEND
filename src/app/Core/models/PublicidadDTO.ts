import { Imagen } from './ImagenDTO';

export interface Publicidad {
  idPublicidad: number;
  enlacePublicidad: string;
  activo: boolean;
  imagen: Imagen;
}