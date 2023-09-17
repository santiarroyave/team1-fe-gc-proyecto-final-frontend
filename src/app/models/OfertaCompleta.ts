import { Imagen } from "./Imagen"
import { Oferta } from "./Oferta"
import { ActividadCompleta } from "./actividades/ActividadCompleta"
import { AlojamientoCompleto } from "./alojamientos/AlojamientoCompleto"

export interface OfertaCompleta{
    oferta:Oferta,
    alojamiento: AlojamientoCompleto,
    actividades: ActividadCompleta[],
    imagenes: Imagen[]
}