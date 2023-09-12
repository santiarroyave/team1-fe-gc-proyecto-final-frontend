export interface Oferta {
    id:number | any,
    titulo:string,
    precio:number,
    maxPersonas:number,
    fechaInicio:string,
    fechaFin:string,
    ofertasDisponibles:number,
    descripcion:string,
    idAlojamiento:number
}