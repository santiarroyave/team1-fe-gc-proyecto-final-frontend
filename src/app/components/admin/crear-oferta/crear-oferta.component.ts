import { Component, OnInit, HostListener, ViewChild, ɵsetAllowDuplicateNgModuleIdsForTest } from '@angular/core';
import { ActividadCrear } from 'src/app/models/actividades/ActividadCrear';
import { OfertaCrear } from 'src/app/models/OfertaCrear';
import { AlojamientoCompleto } from 'src/app/models/alojamientos/AlojamientoCompleto';
import { AlojamientoCrear } from 'src/app/models/alojamientos/AlojamientoCrear';
import { AlojamientosService } from 'src/app/services/alojamientos.service';
import { GestorImgService } from 'src/app/services/gestor-img.service';
import { OfertasService } from 'src/app/services/ofertas.service';
import { ServiciosAlojamientoService } from 'src/app/services/servicios-alojamiento.service';

declare var bootstrap: any;
import { GestorImgComponent } from 'src/app/utils/gestor-img/gestor-img.component';
import { AlojamientoCard } from 'src/app/models/alojamientos/AlojamientoCard';


@Component({
  selector: 'app-crear-oferta',
  templateUrl: './crear-oferta.component.html',
  styleUrls: ['./crear-oferta.component.css']
})
export class CrearOfertaComponent implements OnInit{
  @ViewChild(GestorImgComponent) galeriaFotos!:GestorImgComponent;
  alojamientosCompletos: AlojamientoCard[] = [];
  fotos:any = [];
  serviciosAlojamiento:any = [];

  crearOfertaJson:any;
  
  idAutoIncrementalActividades:number = 0;
  idActividadSeleccionada:number = -1;
  
  fotoActividad: File | null;
  fotoActividadEdicionMode: boolean;

  busquedaAloj:string;
  listaAlojBuscador:any[];

  // datos formulario
  // crearAlojJson:any;
  alojServiciosIds:number[];
  actividades:any[];

  // Atributos esenciales del JSON Crear Oferta
  ofertaTitulo:string;
  ofertaPrecioDia:number|null;
  ofertaMaxPersonas:number|null;
  ofertaFechaInicio:Date|null;
  ofertaFechaFin:Date|null;
  ofertaCantidadDisponible:number|null;
  ofertaDescripcion:string;
  ofertaUrlFotos:string[];
  alojamiento:AlojamientoCrear;
  actividad:ActividadCrear;


  constructor(private alojamientosService: AlojamientosService, private serviciosAlojamientoService: ServiciosAlojamientoService, private gestorImgService: GestorImgService, private ofertaService: OfertasService){
    this.busquedaAloj = "";
    this.listaAlojBuscador = [];
    this.alojServiciosIds = [];
    
    // Datos formulario
    this.ofertaTitulo = "";
    this.ofertaPrecioDia = null;
    this.ofertaMaxPersonas = null;
    this.ofertaFechaInicio = null;
    this.ofertaFechaFin = null;
    this.ofertaCantidadDisponible = null;
    this.ofertaDescripcion = "";
    this.ofertaUrlFotos = [];
    this.alojamiento = {
      nombre: "",
      categoria: "",
      telefono: "",
      email: "",
      pais: "",
      calle: "",
      numero: null,
      codigoPostal: "",
      provincia: "",
      localidad: "",
      imagenes: [],
      servicios: this.alojServiciosIds
    }
    this.actividad = {
      titulo: "",
      descripcion: "",
      pais: "",
      calle: "",
      numero: null,
      codigoPostal: "",
      provincia: "",
      localidad: "",
      imagenes: [],
    }
    
    // Otros datos 
    this.fotoActividad = null;
    this.fotoActividadEdicionMode = false;
    this.actividades = [];
  }
  
  ngOnInit(): void {
    // Importa los servicios disponibles en la BBDD
    this.serviciosAlojamientoService.getAllServicios().subscribe(result => {
      this.serviciosAlojamiento = result;

      // Añade clave select y los establece como desactivados
      for (let i = 0; i < this.serviciosAlojamiento.length; i++) {
        this.serviciosAlojamiento[i].select = false;
      }
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
    let tempActividad:ActividadCrear = { ...this.actividad };
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
            tempActividad.imagenes[0] = result;
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
          tempActividad.imagenes[0] = result;
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
      pais: "",
      calle: "",
      numero: 0,
      codigoPostal: "",
      provincia: "",
      localidad: "",
      imagenes: [],
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
    // Recoge las IDs de los servicios y los almacena en el array necesario
    this.guardarIdsServiciosAloj();

    if (this.galeriaFotos){
      this.galeriaFotos.uploadImages()
      .then((urls) => {
        // Agrega las URLs creadas a la lista de URLs
        for (let i = 0; i < urls.length; i++) {
          this.ofertaUrlFotos.push(urls[i]);
        }
        console.log(urls);

        // ###############################################
        // Aqui se ejecutará el codigo para guardar la oferta en BBDD
        // Porque tiene que esperarse a tener las URLs
        // ###############################################
        this.crearJson();
        this.ofertaUrlFotos = [];

      })
      .catch((error) => {
        // Maneja cualquier error que pueda ocurrir durante la carga de imágenes
        console.error('Error al cargar imágenes:', error);
      });
    }
  }

  crearJson(){
    // Crea el JSON
    const crearOfertaJson: OfertaCrear = {
      titulo: this.ofertaTitulo,
      precioDia: this.ofertaPrecioDia,
      maxPersonas: this.ofertaMaxPersonas,
      fechaInicio: this.ofertaFechaInicio,
      fechaFin: this.ofertaFechaFin,
      ofertasDisponibles: this.ofertaCantidadDisponible,
      descripcion: this.ofertaDescripcion,
      urlFotos: this.ofertaUrlFotos,
      alojamiento: this.alojamiento,
      actividades: this.actividades
    };
    
    // Asigna JSON a variable de pruebas
    this.crearOfertaJson = crearOfertaJson;
    
    // Hace el POST
    this.ofertaService.createOferta(crearOfertaJson);
  }
    
  guardarIdsServiciosAloj(){
    // Este método guarda las ID de los servicios seleccionados (true) en la lista de IDs (this.alojServiciosIds) para adjuntarlo en el JSON
    // Se usa en el método de crear oferta.

    // Resetea las ID de la lista
    this.alojServiciosIds = [];
    // Añade las ID seleccionadas
    for(let servicio of this.serviciosAlojamiento){
      if(servicio.select == true){
        this.alojServiciosIds.push(servicio.id);
      }
    }
  }

  seleccionarServiciosAlojAgenda(ids:number[]){
    // Este  método obtiene las IDs de los servicios del alojamiento de la agenda y los selecciona para que se vean en el Checkbox
    for(let servicio of this.serviciosAlojamiento){
      if(ids.includes(servicio.id)){
        servicio.select = true;
      }
    }
  }

  uploadImagesLocalActividad($event:any){
    this.fotoActividad = $event.target.files[0];
  }

  buscarAloj(){
    // Añade 3 alojamientos de ejemplo
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
    // Llamar al servicio buscar por id

    // Almacenar datos en las variables de alojamiento
    this.alojamiento = {
      nombre: "Hotel palace",
      categoria: "3",
      telefono: "977494753",
      email: "hotelpalace@hotelp.com",
      pais: "España",
      calle: "Calle Real",
      numero: 123,
      codigoPostal: "45683",
      provincia: "Tarragona",
      localidad: "Salou",
      imagenes: [],
      servicios: [1, 4, 6]
    }

    // Servicios de ejemplo
    this.seleccionarServiciosAlojAgenda(this.alojamiento.servicios);
  }

  validarInputNumero(event: any){
    let valorIntroducido = event.target.value;

    // Verifica que el valor introducido sea un numero
    if (!isNaN(parseInt(valorIntroducido))) {
      event.target.classList.remove('input-invalido');
    } else {
      event.target.classList.add('input-invalido');
    }
  }

  // Notas:
  // - Falta implementar para que no deje crear la oferta si hay nulos.
  //Hay que mirarlo porque primero obtiene las URL, luego crea el JSON y luego lo verifica para saber si hace el POST o no, pero se tendria que validar antes de generar las URL para que no de problemas.
  // - Falta que la agenda haga las busquedas
}