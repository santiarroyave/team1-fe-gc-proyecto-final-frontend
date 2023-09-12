import { Component, OnInit, HostListener } from '@angular/core';
import { AlojamientoCompleto } from 'src/app/models/alojamientos/AlojamientoCompleto';
import { AlojamientosService } from 'src/app/services/alojamientos.service';

declare var bootstrap: any;

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

  constructor(private alojamientosService: AlojamientosService){ }
  
  ngOnInit(): void {
    // Generador de fotos de ejemplo
    for (let i = 0; i < 7; i++) {
      this.fotos[i] = "https://concepto.de/wp-content/uploads/2015/03/paisaje-e1549600034372.jpg";
    }
    
    // Genera servicios para el alojamiento de ejemplo
    this.serviciosAlojamiento = ["Wifi", "Lavadora", "Aire acondicionado", "Cocina", "Secadora", "Calefacción", "Zona para trabajar", "Televisión", "Piscina", "Desayuno", "Gimnasio"];
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
}


// ¿Cómo funcionan las ID de las actividades?
// Estas id se usan de manera local para editar las actividades, si se obtuvieran actividades de la base de datos, esas id no se usarian aqui.
// Al crear la oferta se guardan las actividades en la base de datos, el id auto incremental lo pone la propia base de datos.