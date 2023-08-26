import { Component, Input, OnInit } from '@angular/core';
import { OfertasService } from 'src/app/services/ofertas.service';

declare var bootstrap: any;

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css']
})
export class OfertaComponent implements OnInit{
  
  @Input() ofertaId: any;

  favoritoActivo:boolean = false;
  @Input() oferta:any;

  constructor(){ };
  
  // Obtiene la información de la oferta haciendo una llamada al servidor por IP
  ngOnInit(): void {
  }
  
  favorito(){
    if (this.favoritoActivo == false){
      this.favoritoActivo = true;
      this.toastTriggerAdd();
    }else{
      this.favoritoActivo = false;
      this.toastTriggerDelete();
    }
  }

  toastTriggerAdd(): void {
    const toastLiveExample = document.getElementById('liveToastAdd');
    const toastBootstrap = new bootstrap.Toast(toastLiveExample);
    toastBootstrap.show();
  }

  toastTriggerDelete(): void {
    const toastLiveExample = document.getElementById('liveToastDelete');
    const toastBootstrap = new bootstrap.Toast(toastLiveExample);
    toastBootstrap.show();
  }
}
