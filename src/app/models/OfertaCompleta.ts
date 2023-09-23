import { Oferta } from './Oferta';
import { Imagen } from './Imagen';
import { ActividadCompleta } from "./actividades/ActividadCompleta"
import { AlojamientoCompleto } from "./alojamientos/AlojamientoCompleto"

export interface OfertaCompleta {
    oferta: Oferta,
    alojamiento: AlojamientoCompleto,
    actividades: ActividadCompleta[];
    imagenes: Imagen[];
}