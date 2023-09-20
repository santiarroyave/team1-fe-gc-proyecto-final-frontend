import { ActividadCrear } from "./actividades/ActividadCrear";
import { AlojamientoCrear } from "./alojamientos/AlojamientoCrear";

export interface OfertaCrear {
    titulo: string,
    precioDia: number|null,
    maxPersonas: number|null,
    fechaInicio: Date|null,
    fechaFin: Date|null,
    ofertasDisponibles: number|null,
    descripcion: string,
    urlFotos: string[],
    alojamiento: AlojamientoCrear,
    actividades: ActividadCrear[]
}