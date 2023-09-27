import { Component, OnInit, ViewChild } from '@angular/core';
import { ActividadCrear } from 'src/app/models/actividades/ActividadCrear';
import { OfertaCrear } from 'src/app/models/OfertaCrear';
import { AlojamientoCrear } from 'src/app/models/alojamientos/AlojamientoCrear';
import { AlojamientosService } from 'src/app/services/alojamientos.service';
import { GestorImgService } from 'src/app/services/gestor-img.service';
import { OfertasService } from 'src/app/services/ofertas.service';
import { ServiciosAlojamientoService } from 'src/app/services/servicios-alojamiento.service';
import { Router } from '@angular/router';

import { GestorImgComponent } from 'src/app/utils/gestor-img/gestor-img.component';
import { AlojamientoCard } from 'src/app/models/alojamientos/AlojamientoCard';
import { AlojamientoCompleto } from 'src/app/models/alojamientos/AlojamientoCompleto';
import { Servicio, ServicioCelda } from 'src/app/models/Servicio';
import { AlojamientoAgenda } from 'src/app/models/alojamientos/AlojamiengoAgenda';
import { map } from 'rxjs';
import { OfertaCrearAlojamientoAgenda } from 'src/app/models/OfertaCrearAlojamientoAgenda';


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
  
  idAutoIncrementalActividades:number = 0;
  idActividadSeleccionada:number = -1;
  
  fotoActividad: File | null;
  fotoActividadEdicionMode: boolean;

  busquedaAloj:string;
  listaAlojBuscador:any[];

  // datos formulario
  // crearAlojJson:any;
  alojServiciosIds:number[]; 
  actividad:ActividadCrear;
  

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
  actividades:ActividadCrear[];

  alojamientoCompleto: AlojamientoCompleto =  {
    id: 0,
    nombre: "",
    categoria: 0,
    telefono: "",
    email: "",
    direccion: {
        id: 0,
        pais: "",
        calle: "",
        numero: 0,
        codigoPostal: "",
        provincia: "",
        localidad: ""
    },
    imagenes: [],
    servicios: []
  };

  alojamientosAgenda: AlojamientoAgenda[] = [];

  // true si se ha creado un alojamiento nuevo. Lo usaremos para llamar a un endpoint enviando solo el id del alojamiento existente, o creando un alojamiento nuevo.
  alojamientoNuevo: boolean; 
  alojamientoExistenteID: number; //donde guardamos el id del alojamiento seleccionado en la agenda por el ususario

  mostrarBotonResetAlojamiento: boolean;

  constructor(private alojamientosService: AlojamientosService, private serviciosAlojamientoService: ServiciosAlojamientoService, private gestorImgService: GestorImgService, private ofertaService: OfertasService, private router: Router){
    this.alojamientoNuevo = true;
    this.mostrarBotonResetAlojamiento = false;
    this.alojamientoExistenteID = 0;
    
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
      categoria: 0,
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
    this.serviciosAlojamientoService.getAllServicios().pipe(
      map((servicios: Servicio[]) => {
        // Mapear los servicios a ServicioCelda y establecer select en false
        return servicios.map(servicio => ({
          ...servicio,
          select: false
        })) as ServicioCelda[];
      })
    ).subscribe(result => {
      this.serviciosAlojamiento = result;
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
        
        if (this.alojamientoNuevo){
          this.subirOfertaBDD();
        } 
        else if (!this.alojamientoNuevo){
          if (this.alojamientoExistenteID != 0)
            this.subirOfertaBDDAlojamientoExist()
          else
            console.log("Error con el alojamiento seleccionado en la agenda");
        }

        this.ofertaUrlFotos = [];

        // Redirige despues de crear la oferta
        this.router.navigate(["/home"]);

      })
      .catch((error) => {
        // Maneja cualquier error que pueda ocurrir durante la carga de imágenes
        console.error('Error al cargar imágenes:', error);
      });
    }
  }

  subirOfertaBDD(){
    // montamos el objeto
    const oferta: OfertaCrear = {
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
    
    // Hace el POST
    this.ofertaService.createOferta(oferta);
  }

  subirOfertaBDDAlojamientoExist(){
    const oferta: OfertaCrearAlojamientoAgenda = {
      titulo: this.ofertaTitulo,
      precioDia: this.ofertaPrecioDia,
      maxPersonas: this.ofertaMaxPersonas,
      fechaInicio: this.ofertaFechaInicio,
      fechaFin: this.ofertaFechaFin,
      ofertasDisponibles: this.ofertaCantidadDisponible,
      descripcion: this.ofertaDescripcion,
      urlFotos: this.ofertaUrlFotos,
      alojamientoId: this.alojamientoExistenteID,
      actividades: this.actividades
    };

    console.log(oferta);

    this.ofertaService.createOfertaAlojamientoExistente(oferta);
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
        this.alojamiento.servicios.push(servicio.id);
      }
    }
  }

  // funcion para activar las celdas de los servicios caundo seleccionamos un alojamiento en la agenda
  seleccionarServiciosAlojAgenda(servicios: Servicio[]) {
    // comprovamos que hay servicios, si no los hay pondremos todo en false directamente
    if (servicios && servicios.length > 0) {
      for (const servicioAloj of this.serviciosAlojamiento) {
        // si encuentra el servicio, activa la celda
        if (servicios.find(servicio => servicio.id === servicioAloj.id)) {
          servicioAloj.select = true;
        } else {
          servicioAloj.select = false;
        }
      }
    } else {
      this.serviciosAlojamiento.forEach((servicioAloj: { select: boolean; }) => servicioAloj.select = false);
    }
  }
  

  uploadImagesLocalActividad($event:any){
    this.fotoActividad = $event.target.files[0];
  }

  // funcion que llama al servicio de buscar alojamientos por nombre
  buscarAloj(){
    this.alojamientosService.getAlojamientoByName(this.busquedaAloj).subscribe(result => {
      this.alojamientosAgenda = result;
    });
  }

  // funcion que activamos al pulsar un alojamiento de la agenda. Mediante su id, buscamos el alojamiento y autorellenamos los campos del formulario
  seleccionarAloj(id:number){
    // Almacenar datos en las variables de alojamiento
    this.alojamientosService.getAlojamientoById(id).subscribe(
      (response) => {
        this.alojamientoCompleto = response;

        this.seleccionarServiciosAlojAgenda(this.alojamientoCompleto.servicios);

        // Assigna los datos al formulario
        this.alojamiento.nombre = this.alojamientoCompleto.nombre;
        this.alojamiento.categoria = this.alojamientoCompleto.categoria;
        this.alojamiento.telefono = this.alojamientoCompleto.telefono;
        this.alojamiento.email = this.alojamientoCompleto.email;
        this.alojamiento.pais = this.alojamientoCompleto.direccion.pais;
        this.alojamiento.calle = this.alojamientoCompleto.direccion.calle;
        this.alojamiento.numero = this.alojamientoCompleto.direccion.numero;
        this.alojamiento.codigoPostal = this.alojamientoCompleto.direccion.codigoPostal;
        this.alojamiento.provincia = this.alojamientoCompleto.direccion.provincia;
        this.alojamiento.localidad = this.alojamientoCompleto.direccion.localidad;
        this.alojamiento.servicios = this.alojamientoCompleto.servicios.map(servicio => servicio['id']);

        // update de la variable que nos indica si el alojamiento es nuevo o no a FALSE
        this.alojamientoNuevo = false;
        this.alojamientoExistenteID = this.alojamientoCompleto.id;
        this.bloqueoCamposAlojamiento(true);
        this.mostrarBotonResetFormularioAlojamiento();
      },
      (error) => {
        console.error("Ha habido un error" + error);
        throw error;
      }
    );
  }

  bloqueoCamposAlojamiento(bloquear:boolean){
    const nombreInput = document.getElementById('nombre') as HTMLInputElement;
    const paisInput = document.getElementById('pais') as HTMLInputElement;
    const calleInput = document.getElementById('calle') as HTMLInputElement;
    const numeroInput = document.getElementById('numero') as HTMLInputElement;
    const codigoPostalInput = document.getElementById('codigoPostal') as HTMLInputElement;
    const provinciaInput = document.getElementById('provincia') as HTMLInputElement;
    const localidadInput = document.getElementById('localidad') as HTMLInputElement;
    const emailInput = document.getElementById('email') as HTMLInputElement;
    const telefonoInput = document.getElementById('telefono') as HTMLInputElement;
    const categoriaInput = document.getElementById('categoria') as HTMLInputElement;

    nombreInput.disabled = bloquear;
    paisInput.disabled = bloquear;
    calleInput.disabled = bloquear;
    numeroInput.disabled = bloquear;
    codigoPostalInput.disabled = bloquear;
    provinciaInput.disabled = bloquear;
    localidadInput.disabled = bloquear;
    emailInput.disabled = bloquear;
    telefonoInput.disabled = bloquear;
    categoriaInput.disabled = bloquear;
  }

  mostrarBotonResetFormularioAlojamiento(){
    this.mostrarBotonResetAlojamiento = true;
  }

  resetFormulario(){
    this.alojamiento.nombre = "";
    this.alojamiento.categoria = 0;
    this.alojamiento.telefono = "";
    this.alojamiento.email = "";
    this.alojamiento.pais = "";
    this.alojamiento.calle = "";
    this.alojamiento.numero = null;
    this.alojamiento.codigoPostal = "";
    this.alojamiento.provincia = "";
    this.alojamiento.localidad = "";
    this.serviciosAlojamiento.forEach((servicioAloj: { select: boolean; }) => servicioAloj.select = false);

    //desbloqueamos los campos del formulario del alojamiento
    this.bloqueoCamposAlojamiento(false);
    // update de la variable que nos indica si el alojamiento es nuevo o no a TRUE porque ahora el usuario puede introducir un formulario nuevo
    this.alojamientoNuevo = true;
    this.alojamientoExistenteID = 0; //Aunque no haría falta, reasignamos el id del alojamiento a 0 para deseleccionar el antiguo. No haría falta porque si alojamientoNuevo es false se ejecuto otro endpoint que no necesita esta variables, pero por seguridad lo desassignamos igualemnte
    // ocultamos el botón de reset
    this.mostrarBotonResetAlojamiento = false;
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