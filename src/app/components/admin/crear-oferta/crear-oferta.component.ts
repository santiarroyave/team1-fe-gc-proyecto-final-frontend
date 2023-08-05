import { Component } from '@angular/core';

@Component({
  selector: 'app-crear-oferta',
  templateUrl: './crear-oferta.component.html',
  styleUrls: ['./crear-oferta.component.css']
})
export class CrearOfertaComponent {

  fotos:any = [];
  constructor(){
    this.fotos[0] = "https://concepto.de/wp-content/uploads/2015/03/paisaje-e1549600034372.jpg";
    this.fotos[1] = "https://concepto.de/wp-content/uploads/2015/03/paisaje-e1549600034372.jpg";
    this.fotos[2] = "https://concepto.de/wp-content/uploads/2015/03/paisaje-e1549600034372.jpg";
    this.fotos[3] = "https://concepto.de/wp-content/uploads/2015/03/paisaje-e1549600034372.jpg";
    this.fotos[4] = "https://concepto.de/wp-content/uploads/2015/03/paisaje-e1549600034372.jpg";
    this.fotos[5] = "https://concepto.de/wp-content/uploads/2015/03/paisaje-e1549600034372.jpg";
    this.fotos[6] = "https://concepto.de/wp-content/uploads/2015/03/paisaje-e1549600034372.jpg";
  }

}
