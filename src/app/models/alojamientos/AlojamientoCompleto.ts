import { Imagen } from "../Imagen";

export interface AlojamientoCompleto{
    id: number,
    nombre:string,
    categoria:number,
    telefono: string,
    email: string,
    idDireccion: number,
    pais: string,
    calle: string,
    numero: number,
    codigoPostal: string,
    provincia: string,
    localidad: string,
    imagenes: Imagen[]
}