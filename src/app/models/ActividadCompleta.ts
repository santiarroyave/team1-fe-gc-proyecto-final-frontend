import { Imagen } from "./Imagen";

export interface ActividadCompleta{
    id: number,
    titulo:string,
    descripcion:string,
    idDireccion: number,
    pais: string,
    calle: string,
    numero: number,
    codigoPostal: string,
    provincia: string,
    localidad: string,
    imagenes: Imagen[]
}