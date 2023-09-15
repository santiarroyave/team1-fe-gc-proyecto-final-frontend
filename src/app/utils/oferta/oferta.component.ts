import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Favorito } from 'src/app/models/Favorito';
import { FavoritosService } from 'src/app/services/favoritos.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

declare var bootstrap: any;

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css']
})
export class OfertaComponent implements OnInit{
  
  @Input() ofertas:any;

  constructor(private tokenStorageService: TokenStorageService, private favoritosService: FavoritosService){ };
  
  // Obtiene la información de la oferta haciendo una llamada al servidor por IP
  ngOnInit(): void {
  }
  
  favorito(oferta:any){
    const id_user = this.tokenStorageService.getUser().id;
    const id_oferta = oferta.id;
    if (!oferta.favorito){
      oferta.favorito = true;
      const fav:Favorito = {
        idOferta: id_oferta,
        idUsuario: id_user
      }
      this.favoritosService.createFavorito(fav).subscribe();
      this.toastTriggerAdd();
    }else{
      oferta.favorito = false;
      this.favoritosService.deleteFavorito(id_user,id_oferta).subscribe();
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
