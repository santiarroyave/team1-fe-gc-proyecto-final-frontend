import { Alojamiento } from "./Alojamiento";
import { Oferta } from "./Oferta";
import { ServiciosAlojamientos } from "./ServiciosAlojamientos";

export interface FiltrosResponse{
    ofertas: Oferta[],
    alojamientos: Alojamiento[],
    s_A: ServiciosAlojamientos[]
}