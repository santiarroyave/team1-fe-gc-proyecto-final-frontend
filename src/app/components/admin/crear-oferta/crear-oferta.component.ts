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
  alojamientosCompletos: AlojamientoCompleto[] = [];
  fotos:any = [];
  serviciosAlojamiento:any = [];
  listaActividades:any = [];

  nombreActividad:string="";
  descripcionActividad:string="";

  idAutoIncrementalActividades:number = 0;
  idActividadSeleccionada:number = -1;

  // datos formulario
  urlFotos:string[];
  crearOfertaJson:any;
  crearAlojJson:any;
  // oferta
  ofertaTitulo:string;
  ofertaPrecioDia:number|null;
  ofertaMaxPersonas:number|null;
  ofertaFechaInicio:Date|null;
  ofertaFechaFin:Date|null;
  ofertasDisponibles:number|null;
  ofertaDescripcion:string;
  // alojamiento
  alojNombre:string;
  alojPais:string;
  alojDireccion:string;
  alojNum:string;
  alojCp:number|null;
  alojProvincia:string;
  alojLocalidad:string;
  alojEmail:string;
  alojTel:number|null;
  alojCategoria:number|null;
  alojServiciosIds:number[];

  prueba:any;


  constructor(private alojamientosService: AlojamientosService, private serviciosAlojamientoService: ServiciosAlojamientoService){
    // this.serviciosAlojamiento = serviciosAlojamientoService.getAllServicios();
    // console.log(serviciosAlojamientoService.getAllServicios());
    
    

    // datos formulario 
    this.urlFotos = [];
    // oferta
    this.ofertaTitulo = "";
    this.ofertaPrecioDia = null;
    this.ofertaMaxPersonas = null;
    this.ofertaFechaInicio = null;
    this.ofertaFechaFin = null;
    this.ofertasDisponibles = null;
    this.ofertaDescripcion = "";
    // alojamiento
    this.alojNombre = "";
    this.alojPais = "";
    this.alojDireccion = "";
    this.alojNum = "";
    this.alojCp = null;
    this.alojProvincia = "";
    this.alojLocalidad = "";
    this.alojEmail = "";
    this.alojTel = null;
    this.alojCategoria = null;
    this.alojServiciosIds = [];
  }
  @ViewChild(GestorImgComponent) galeriaFotos!:GestorImgComponent;
  
  ngOnInit(): void {
    // Generador de fotos de ejemplo
    for (let i = 0; i < 7; i++) {
      this.fotos[i] = "https://concepto.de/wp-content/uploads/2015/03/paisaje-e1549600034372.jpg";
    }
    
    // Genera servicios para el alojamiento de ejemplo
    this.serviciosAlojamientoService.getAllServicios().subscribe(result => {
      this.serviciosAlojamiento = result;
    });
    // this.serviciosAlojamiento = ["Wifi", "Lavadora", "Aire acondicionado", "Cocina", "Secadora", "Calefacción", "Zona para trabajar", "Televisión", "Piscina", "Desayuno", "Gimnasio"];

    this.alojamientosService.getAllAlojamientos().subscribe(response => {
      this.alojamientosCompletos = response;
      console.log(this.alojamientosCompletos);
    });
    // Generador de actividades de ejemplo
    for (let i = 0; i < 5; i++) {
      this.agregarActividad(`Actividad ${i}`, "Some quick example text to build on the card title and make up the bulk of the card's content. Some quick example text to build on the card title and make up the bulk of the card's content.", "https://www.portaventuraworld.com/blog/wp-content/uploads/2023/05/Paw-World-1200x600-1.jpg");
    }
  }

  // Recoge los datos del formulario y los envia a la funcion que los agrega y resetea el formulario
  btnAddActividad(){
    this.agregarActividad(this.nombreActividad, this.descripcionActividad, "");
  }

  // Añade una actividad a la lista de actividades
  agregarActividad(titulo:string, descripcion:string, imagen:string){
    // Nueva actividad: si no hay un ID seleccionada se usa el ID auto incremental
    // Editar actividad: si hay un ID seleccionada se usa ese id
    if(this.idActividadSeleccionada == -1){
      this.idAutoIncrementalActividades += 1;
      this.idActividadSeleccionada = this.idAutoIncrementalActividades;
      
      // Añade nuevas actividades a la lista
      this.listaActividades.unshift({
        id: this.idActividadSeleccionada,
        titulo: titulo,
        descripcion: descripcion,
        imagen: imagen
      });
    }else{
      // Edita los datos de la Actividad seleccionada
      this.listaActividades.splice(this.idActividadSeleccionada, 1, {
        id: this.idActividadSeleccionada,
        titulo: titulo,
        descripcion: descripcion,
        imagen: imagen
      });
    }

    // Resetea el formulario y lo deja vacio
    this.nombreActividad="";
    this.descripcionActividad="";
    this.idActividadSeleccionada = -1;
  }

  editarActividad(id:number){
    // 1. Encuentra su posición dentro de la lista
    let posicion = this.listaActividades.findIndex((busqueda:any) => busqueda.id == id);

    // 2. Muestra los datos en el formulario y guarda el ID
    if(posicion != -1){
      this.nombreActividad = this.listaActividades[posicion].titulo;
      this.descripcionActividad = this.listaActividades[posicion].descripcion;
      this.idActividadSeleccionada = posicion;
    }

    // Funcionalidad para hacer scroll automático hasta la zona de edición
    let elemento = document.getElementById("crearActividad");
    if (elemento) {
      elemento.scrollIntoView({ behavior: 'smooth' });
    }
  }

  

  borrarActividad(id:number){
    // 1. Encuentra su posición dentro de la lista
    let posicion = this.listaActividades.findIndex((busqueda:any) => busqueda.id == id);

    // 2. Borra la actividad
    this.listaActividades.splice(posicion, 1);
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
        // Maneja la lista de URLs aquí
          this.urlFotos = urls;

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
      oferta: {
        titulo: this.ofertaTitulo,
        precioDia: this.ofertaPrecioDia,
        maxPersonas: this.ofertaMaxPersonas,
        fechaInicio: this.ofertaFechaInicio,
        fechaFin: this.ofertaFechaFin,
        ofertasDisponibles: this.ofertasDisponibles,
        descripcion: this.ofertaDescripcion,
        urlFotos: this.urlFotos
      },
      alojamiento: {
        nombre: this.alojNombre,
        pais: this.alojPais,
        direccion: this.alojDireccion,
        numero: this.alojNum,
        cp: this.alojCp,
        provincia: this.alojProvincia,
        localidad: this.alojLocalidad,
        email: this.alojEmail,
        tel: this.alojTel,
        categoria: this.alojCategoria,
        servicios: this.alojServiciosIds
      } 
    };
    
    console.log("ESTE ES EL JSON");
    console.log(this.crearOfertaJson);
  }

  seleccionarServicio(servicioId:number){
    if (this.alojServiciosIds.includes(servicioId)) {
      // El servicio está seleccionado, así que lo deseleccionamos
      this.alojServiciosIds = this.alojServiciosIds.filter(id => id !== servicioId);
    }else{
      // El servicio no está seleccionado, así que lo seleccionamos
      this.alojServiciosIds.push(servicioId);
    }
  }
}


// ¿Cómo funcionan las ID de las actividades?
// Estas id se usan de manera local para editar las actividades, si se obtuvieran actividades de la base de datos, esas id no se usarian aqui.
// Al crear la oferta se guardan las actividades en la base de datos, el id auto incremental lo pone la propia base de datos