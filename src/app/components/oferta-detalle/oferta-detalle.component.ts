import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OfertasService } from 'src/app/services/ofertas.service';

declare var bootstrap: any;

@Component({
  selector: 'app-oferta-detalle',
  templateUrl: './oferta-detalle.component.html',
  styleUrls: ['./oferta-detalle.component.css'],
})
export class OfertaDetalleComponent implements OnInit {
  @ViewChild('liveToast', { static: true })
  num_noches: number = 14;
  toastLiveExampleRef!: ElementRef<HTMLElement>;

  // Datos de la oferta
  oferta: any;
  alojamiento: any;
  direccionAloj: any;
  serviciosAloj: any;
  actividades: any;

  listaActividades:any;
  fotosGaleria:any;
  posicionFotoSeleccionada:number = 0;


  constructor(private route: ActivatedRoute, private ofertasService: OfertasService, private router: Router ) {
    this.oferta = null;
    this.alojamiento = [];
    
    this.direccionAloj = [];
    this.serviciosAloj = [];
    this.actividades = [];

    this.listaActividades = [];
    this.fotosGaleria = [];
  }

  ngOnInit(): void {
    // Obtiene la ID de la ruta y obtiene los datos
    this.route.params.subscribe((params) => {
      const rutaId: number = Number(params['id']);

      // obtiene los datos
      this.ofertasService.getOfertaCompletaById(rutaId).subscribe(result => {
        this.oferta = result.oferta;
        this.alojamiento = result.alojamiento;
        this.direccionAloj = result.alojamiento.direccion;
        this.serviciosAloj = result.alojamiento.servicios;
        this.actividades = result.actividades;
        this.fotosGaleria = result.imagenes;

        this.corregirResultadosVacios();
      },
      error =>{
        console.log("No se ha encontrado la oferta");
        this.router.navigate(["page-not-found"]);
      });
    });
  }

  seleccionarImagenGaleria(id:number){
    // Buscar posicion del id en la lista
    let posicion = this.fotosGaleria.findIndex((foto:any) => foto.id == id);
    // Asignar posicion del id
    this.posicionFotoSeleccionada = posicion;
  }
  seleccionarImagenConFlecha(direccion:number){
    let posicion = this.posicionFotoSeleccionada;
    let tamaño = this.fotosGaleria.length;
    
    if (direccion == 0){
      if (posicion > 0) {
        posicion -= 1;
      }
    }else if (direccion == 1) {
      if (posicion < tamaño-1) {
        posicion += 1;
      }
    }
    this.posicionFotoSeleccionada = posicion;
  }

  mostrarCategoria(id:number):string{
    switch (id){
      // case 0:
      //   return "Apartamentos y cámpings";
      case 1:
        return "★";
      case 2:
        return "★★";
      case 3:
        return "★★★";
      case 4:
        return "★★★★";
      case 5:
        return "★★★★★";
      default:
        return "";
    }
  }

  corregirResultadosVacios(){
    // Si no hay foto de encabezado
    if(this.fotosGaleria[0] == undefined){
      this.fotosGaleria[0] = {
        url: ""
      };
    }
  }
}
