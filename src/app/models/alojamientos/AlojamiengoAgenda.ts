import { Direccion } from "../Direccion"

export interface AlojamientoAgenda{
    id: number,
    nombre:string,
    email:string,
    telefono: string,
    direccion: Direccion
}