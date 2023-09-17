import { Oferta } from './Oferta';
import { Imagen } from './Imagen';
import { ServicioIdName } from './Servicio';

export interface OfertaCompleta {
    oferta: Oferta,
    alojamiento: AlojamientoCompleto,
    actividades: ActividadCompleta[];
    imagenes: Imagen[];
}

export interface AlojamientoCompleto {
    id: number,
    nombre: string,
    categoria: number,
    telefono: string,
    direccion: string,
    imagenes: Imagen[],
    servicios: ServicioIdName[],
}
export interface ActividadCompleta {
    id: number,
    Titulo: string,
    descripcion: string,
    direccion: Direccion[],
    imagenes: Imagen[]
}
export interface Direccion {
    id: number,
    pais: string,
    provincia: string,
    localidad: string,
    codigoPostal: string,
    calle: string,
    numero: number
}