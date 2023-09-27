import { Direccion } from "../Direccion"

export interface AlojamientoAgenda{
    id: number,
    nombre:string,
    categoria:number,
    email:string,
    telefono: string,
    direccion: Direccion
}