import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css']
})
export class OfertaComponent {
  @Input() listaOfertas: any = [];
  
  favoritoActivo:boolean = false;
  
  saluda(){
    if (this.favoritoActivo == false){
      this.favoritoActivo = true;
    }else{
      this.favoritoActivo = false;
    }
  }
}
