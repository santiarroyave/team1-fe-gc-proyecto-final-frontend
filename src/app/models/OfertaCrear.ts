import { ActividadCrear } from "./ActividadCrear";
import { AlojamientoCrear } from "./alojamientos/AlojamientoCrear";

export interface OfertaCrear {
    titulo: string,
    precioDia: number,
    maxPersonas: number,
    fechaInicio: Date | null,
    fechaFin: Date | null,
    ofertasDisponibles: number,
    descripcion: string,
    urlFotos: string[],
    alojamiento: AlojamientoCrear,
    actividades: ActividadCrear[]
}