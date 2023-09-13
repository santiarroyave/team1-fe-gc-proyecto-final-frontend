import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { AlojamientoCompleto } from 'src/app/models/alojamientos/AlojamientoCompleto';
import { AlojamientosService } from 'src/app/services/alojamientos.service';
import { GestorImgService } from 'src/app/services/gestor-img.service';
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
  
  fotoActividad: File | null;
  fotoActividadEdicionMode: boolean;

  busquedaAloj:string;
  listaAlojBuscador:any[];

  // datos formulario
  urlFotos:string[];
  crearOfertaJson:any;
  crearAlojJson:any;

  oferta:any;
  alojServiciosIds:number[];
  alojamiento:any;
  actividades:any[];
  actividad:any;

  constructor(private alojamientosService: AlojamientosService, private serviciosAlojamientoService: ServiciosAlojamientoService, private gestorImgService: GestorImgService){
    this.busquedaAloj = "";
    this.listaAlojBuscador = [];

    // datos formulario 
    this.urlFotos = [];
    this.fotoActividad = null;
    this.fotoActividadEdicionMode = false;
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

  // Añade una actividad a la lista de actividades
  agregarActividad(){
    // Notas:
    // - Si se crea una nueva actividad es obligatorio poner foto.
    // - Si se edita la actividad y se actualiza la foto, se almacena y se obiene una url nueva. Sino no y solo se actualizarian los datos.
    // - Se han clonado los datos en las variables temp, porque si la variable apunta a la misma dirección en vez de clonarse, los datos se resetearian antes de obtener la url de la foto
    let tempActividad = { ...this.actividad };
    let tempIdActividadSeleccionada = this.idActividadSeleccionada;

    // NUEVA ACTIVIDAD: si no hay un ID seleccionada se usa el ID auto incremental
    if(tempIdActividadSeleccionada == -1){
      // Guardar y obtener url de la foto
      if (this.fotoActividad != null) {
        this.idAutoIncrementalActividades += 1;

        this.gestorImgService.uploadImage(this.fotoActividad, "actividades")
          .then(result => {
            // Ejecuta el código después de tener la URL
            // Añade nuevas actividades a la lista
            // -----------------------------------------
            tempActividad.urlImagen = result;
            this.actividades.unshift(tempActividad);
            // -----------------------------------------
          })
          .catch(error => console.log(error));
      }else{
        alert("Falta añadir foto a la actividad");
        return;
      }
    }
    // EDITAR ACTIVIDAD: si hay un ID seleccionada se usa ese id
    else{
      // Si se ha actualizado la foto se guarda y se obtiene nueva URL
      if (this.fotoActividadEdicionMode == true && this.fotoActividad != null) {
        // Guardar y obtener url de la foto
        this.gestorImgService.uploadImage(this.fotoActividad, "actividades")
        .then(result => {
          // Ejecuta el código después de tener la URL
          // Actualiza con la nueva foto
          // -----------------------------------------
          tempActividad.urlImagen = result;
          this.actividades.splice(tempIdActividadSeleccionada, 1, tempActividad);
          // -----------------------------------------
        })
        .catch(error => {
          console.log(error);
          alert("Error al cargar la foto");
        }); 
        
      }else{
        this.actividades.splice(tempIdActividadSeleccionada, 1, tempActividad);
      }
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
    this.fotoActividad = null;
    this.fotoActividadEdicionMode = false;
    this.idActividadSeleccionada = -1;
  }

  editarActividad(titulo:string){
    // 1. Encuentra su posición dentro de la lista
    let posicion = this.actividades.findIndex((actividad:any) => actividad.titulo == titulo);

    // 2. Muestra los datos en el formulario y guarda el ID
    if(posicion != -1){
      this.actividad = { ...this.actividades[posicion] };
      this.idActividadSeleccionada = posicion;
    }

    // 3. Activar el modo edicion de fotografia
    this.fotoActividadEdicionMode = true;

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

  uploadImagesLocalActividad($event:any){
    this.fotoActividad = $event.target.files[0];
  }

  // AGENDA
  modalTrigger(): void {
    const modalLiveExample = document.getElementById('liveModal');

    const modalBootstrap = new bootstrap.Toast(modalLiveExample);
    modalBootstrap.show();
  }

  buscarAloj(){
    let alojamiento = {
      id: 45,
      nombre: "Hotel palace",
      localidad: "Salou",
      provincia: "Tarragona",
      calle: "Calle Real",
      numero: "123",
      cp: "45683",
      tel: "977494753",
      email: "hotelpalace@hotelp.com"
    };
    for (let i = 0; i < 3; i++) {
      this.listaAlojBuscador.push(alojamiento);      
    }
  }

  seleccionarAloj(id:number){
    // alert(id);
    // obtener todos los datos de este alojamiento por ID y guardarlos en "this.alojamiento"

    // Llamar ala servicio buscar por id

    // Almacenar datos en "this.alojamiento"
    this.alojamiento = {
      nombre: "Hotel palace",
      pais: "España",
      direccion: "Calle Real",
      numero: "123",
      cp: 45683,
      provincia: "Tarragona",
      localidad: "Salou",
      email: "hotelpalace@hotelp.com",
      tel: 977494753,
      categoria: 3
    }

    // Servicios de ejemplo
    let listaServicios = [3, 4, 6]

    for (let i = 0; i < listaServicios.length; i++) {
      console.log("seleccionando servicio");
      console.log(listaServicios[i]);
      this.seleccionarServicio(listaServicios[i]); 
    }
  }
}