export interface ActividadCrear{
    titulo:string,
    descripcion:string,
    pais: string,
    calle: string,
    numero: number|null,
    codigoPostal: string,
    provincia: string,
    localidad: string,
    imagenes: string[]
}