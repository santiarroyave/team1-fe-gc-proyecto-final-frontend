import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-crear-oferta',
  templateUrl: './crear-oferta.component.html',
  styleUrls: ['./crear-oferta.component.css']
})
export class CrearOfertaComponent implements OnInit{

  fotos:any = [];
  serviciosAlojamiento:any = [];
  listaActividades:any = [];

  nombreActividad:string="";
  descripcionActividad:string="";

  constructor(){ }
  
  ngOnInit(): void {
    // Generador de fotos de ejemplo
    for (let i = 0; i < 7; i++) {
      this.fotos[i] = "https://concepto.de/wp-content/uploads/2015/03/paisaje-e1549600034372.jpg";
    }
    
    // Genera servicios para el alojamiento de ejemplo
    this.serviciosAlojamiento = ["Wifi", "Lavadora", "Aire acondicionado", "Cocina", "Secadora", "Calefacción", "Zona para trabajar", "Televisión", "Piscina", "Desayuno", "Gimnasio"];

    // Generador de actividades de ejemplo
    for (let i = 0; i < 5; i++) {
      this.agregarActividad(`Actividad ${i}`, "Some quick example text to build on the card title and make up the bulk of the card's content. Some quick example text to build on the card title and make up the bulk of the card's content.", "https://www.portaventuraworld.com/blog/wp-content/uploads/2023/05/Paw-World-1200x600-1.jpg");
    }

  }

  // Recoge los datos del formulario y los envia a la funcion que los agrega y resetea el formulario
  btnAddActividad(){
    this.agregarActividad(this.nombreActividad, this.descripcionActividad, "");
    this.nombreActividad="";
    this.descripcionActividad="";
  }

  // Añade una actividad a la lista de actividades
  agregarActividad(titulo:string, descripcion:string, imagen:string){
    this.listaActividades.unshift({
      titulo: titulo,
      descripcion: descripcion,
      imagen: imagen
    })
  }
}
