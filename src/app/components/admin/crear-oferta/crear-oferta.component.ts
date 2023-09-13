import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { AlojamientoCompleto } from 'src/app/models/alojamientos/AlojamientoCompleto';
import { AlojamientosService } from 'src/app/services/alojamientos.service';
import { ServiciosAlojamientoService } from 'src/app/services/servicios-alojamiento.service';

declare var bootstrap: any;
import { GestorImgComponent } from 'src/app/utils/gestor-img/gestor-img.component';


@Component({
  selector: 'app-crear-oferta',
  templateUrl: './crear-oferta.component.html',
  styleUrls: ['./crear-oferta.component.css']
})
export class CrearOfertaComponent implements OnInit{
  @ViewChild(GestorImgComponent) galeriaFotos!:GestorImgComponent;
  alojamientosCompletos: AlojamientoCompleto[] = [];
  fotos:any = [];
  serviciosAlojamiento:any = [];

  idAutoIncrementalActividades:number = 0;
  idActividadSeleccionada:number = -1;

  // datos formulario
  urlFotos:string[];
  crearOfertaJson:any;
  crearAlojJson:any;

  oferta:any;
  alojServiciosIds:number[];
  alojamiento:any;
  actividades:any[];
  actividad:any;

  constructor(private alojamientosService: AlojamientosService, private serviciosAlojamientoService: ServiciosAlojamientoService){
    // datos formulario 
    this.urlFotos = [];
    // oferta
    this.oferta = {
        titulo: "",
        precioDia: null,
        maxPersonas: null,
        fechaInicio: Date,
        fechaFin: Date,
        ofertasDisponibles: null,
        descripcion: "",
        urlFotos: this.urlFotos
    }
    // alojamiento
    this.alojServiciosIds = [];
    this.alojamiento = {
        nombre: "",
        pais: "",
        direccion: "",
        numero: "",
        cp: null,
        provincia: "",
        localidad: "",
        email: "",
        tel: null,
        categoria: null,
        servicios: this.alojServiciosIds
    }
    // servicios
    this.actividad = {
      titulo: "",
      descripcion: "",
      urlImagen: "",
      pais: "",
      direccion: "",
      numero: null,
      cp: "",
      provincia: "",
      localidad: ""
    }
    this.actividades = new Array;
  }
  
  ngOnInit(): void {
    // Importa los servicios disponibles en la BBDD
    this.serviciosAlojamientoService.getAllServicios().subscribe(result => {
      this.serviciosAlojamiento = result;
    });

    this.alojamientosService.getAllAlojamientos().subscribe(response => {
      this.alojamientosCompletos = response;
      console.log(this.alojamientosCompletos);
    });
  }

  // Recoge los datos del formulario y los envia a la funcion que los agrega y resetea el formulario
  btnAddActividad(){
    this.agregarActividad();
  }

  // Añade una actividad a la lista de actividades
  agregarActividad(){
    // Nueva actividad: si no hay un ID seleccionada se usa el ID auto incremental
    // Editar actividad: si hay un ID seleccionada se usa ese id
    if(this.idActividadSeleccionada == -1){
      this.idAutoIncrementalActividades += 1;
      this.idActividadSeleccionada = this.idAutoIncrementalActividades;
      
      // Añade nuevas actividades a la lista
      this.actividades.unshift(this.actividad);
    }else{
      // Edita los datos de la Actividad seleccionada
      this.actividades.splice(this.idActividadSeleccionada, 1, this.actividad);
    }

    // Resetea el formulario y lo deja vacio
    this.actividad = {
      titulo: "",
      descripcion: "",
      urlImagen: "",
      pais: "",
      direccion: "",
      numero: null,
      cp: "",
      provincia: "",
      localidad: ""
    }
    this.idActividadSeleccionada = -1;
  }

  editarActividad(titulo:string){
    // 1. Encuentra su posición dentro de la lista
    let posicion = this.actividades.findIndex((actividad:any) => actividad.titulo == titulo);

    // 2. Muestra los datos en el formulario y guarda el ID
    if(posicion != -1){
      this.actividad = this.actividades[posicion];
      this.idActividadSeleccionada = posicion;
    }

    // Funcionalidad para hacer scroll automático hasta la zona de edición
    let elemento = document.getElementById("crearActividad");
    if (elemento) {
      elemento.scrollIntoView({ behavior: 'smooth' });
    }
  }

  

  borrarActividad(titulo:string){
    // 1. Encuentra su posición dentro de la lista
    let posicion = this.actividades.findIndex((actividad:any) => actividad.titulo == titulo);

    // 2. Borra la actividad
    this.actividades.splice(posicion, 1);
  }

  
  modalTrigger(): void {
    const modalLiveExample = document.getElementById('liveModal');

    const modalBootstrap = new bootstrap.Toast(modalLiveExample);
    modalBootstrap.show();
  }
  
  crearOferta(){
    if (this.galeriaFotos){
      this.galeriaFotos.uploadImages()
      .then((urls) => {
        // Agrega las URLs creadas a la lista de URLs
        for (let i = 0; i < urls.length; i++) {
          this.urlFotos.push(urls[i]);
        }
        console.log(urls);

        // ###############################################
        // Aqui se ejecutará el codigo para guardar la oferta en BBDD
        // Porque tiene que esperarse a tener las URLs
        // ###############################################
        this.crearJson();

      })
      .catch((error) => {
        // Maneja cualquier error que pueda ocurrir durante la carga de imágenes
        console.error('Error al cargar imágenes:', error);
      });
    }
  }

  crearJson(){
    this.crearOfertaJson = {
      oferta: this.oferta,
      alojamiento: this.alojamiento,
      actividades: this.actividades
    };
    
    console.log("ESTE ES EL JSON");
    console.log(this.crearOfertaJson);
  }

  seleccionarServicio(servicioId:number){
    if (this.alojServiciosIds.includes(servicioId)) {
      // El servicio está seleccionado, así que lo deseleccionamos
      this.alojServiciosIds = this.alojServiciosIds.filter(id => id !== servicioId);
      console.log("Servicio quitado");
    }else{
      // El servicio no está seleccionado, así que lo seleccionamos
      this.alojServiciosIds.push(servicioId);
      console.log("Servicio agregado");
    }
  }
}


// ¿Cómo funcionan las ID de las actividades?
// Estas id se usan de manera local para editar las actividades, si se obtuvieran actividades de la base de datos, esas id no se usarian aqui.
// Al crear la oferta se guardan las actividades en la base de datos, el id auto incremental lo pone la propia base de datos