import { Direccion } from "../Direccion";
import { Imagen } from "../Imagen";

export interface ActividadCompleta{
    id: number,
    titulo:string,
    descripcion:string,
    direccion: Direccion,
    imagenes: Imagen[]
}