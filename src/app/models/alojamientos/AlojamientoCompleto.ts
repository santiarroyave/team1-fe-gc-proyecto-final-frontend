import { Direccion } from "../Direccion";
import { Imagen } from "../Imagen";

export interface AlojamientoCompleto{
    id: number,
    nombre:string,
    categoria:number,
    telefono: string,
    email: string,
    direccion: Direccion,
    imagenes: Imagen[],
    servicios: number[]
}