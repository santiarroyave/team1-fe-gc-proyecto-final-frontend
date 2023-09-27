export interface AlojamientoCrear{
    nombre:string,
    categoria:number,
    telefono:string,
    email:string,
    pais: string,
    calle: string,
    numero: number|null,
    codigoPostal: string,
    provincia: string,
    localidad: string,
    imagenes: string[],
    servicios: number[]
}