export interface Oferta {
    Id:number | any,
    Titulo:string,
    Precio:number,
    MaxPersonas:number,
    FechaInicio:string,
    FechaFin:string,
    OfertasDisponibles:number,
    Descripcion:string,
    IdActividad:number,
    idAlojamiento:number
}