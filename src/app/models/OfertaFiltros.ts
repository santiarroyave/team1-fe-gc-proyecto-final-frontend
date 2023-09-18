import { Direccion } from "./Direccion";
import { OfertaCard } from "./OfertaCard";
import { Servicio } from "./Servicio";

export interface OfertaFiltros {
    oferta: OfertaCard,
    categoriaAlojamiento: number,
    direccionAlojamiento: Direccion,
    serviciosAlojamiento: Servicio[],
    favorito: boolean
}