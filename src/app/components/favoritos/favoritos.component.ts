import { Component } from '@angular/core';
import { Favorito } from 'src/app/models/Favorito';
import { Oferta } from 'src/app/models/Oferta';
import { FavoritosService } from 'src/app/services/favoritos.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent {

  ofertas: any = [];
  favoritos!: Favorito[];

  constructor(private favoritosService: FavoritosService, private tokenService: TokenStorageService){ };

  ngOnInit(): void {
    // Obtiene todas las ofertas del servicio. Esto tendrá que ser modificado para que solo obtenga las ofertas favoritas
    const id_user = this.tokenService.getUser().id;
    this.favoritosService.getFavoritosByUserId(id_user)
    .subscribe( fav_response => {
      this.favoritos = fav_response;
      if(this.favoritos.length>0){
        for (let i = 0; i < this.favoritos.length; i++) {
          if(this.favoritos[i].idOferta!=null){
            this.favoritosService.getOfertasById(this.favoritos[i].idOferta)
            .subscribe( res => {
              this.ofertas.push({...res,favorito:true});
            });
          }
        }
      }
    });
  }
}
