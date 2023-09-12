import { Component, Input, OnInit } from '@angular/core';
import { Favorito } from 'src/app/models/Favorito';
import { OfertasService } from 'src/app/services/ofertas.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

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

  constructor(private tokenStorageService: TokenStorageService, private ofertasService: OfertasService){ };
  
  // Obtiene la información de la oferta haciendo una llamada al servidor por IP
  ngOnInit(): void {
  }
  
  favorito(){
    if (this.favoritoActivo == false){
      this.favoritoActivo = true;
      const id_user = this.tokenStorageService.getUser().id;
      const id_oferta = this.ofertaId;
      const fav:Favorito = {
        idOferta: id_oferta,
        idUsuario: id_user
      }
      this.ofertasService.postFavorito(fav).subscribe();
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
