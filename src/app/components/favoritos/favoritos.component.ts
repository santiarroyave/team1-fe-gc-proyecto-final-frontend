import { Component } from '@angular/core';
import { Favorito } from 'src/app/models/Favorito';
import { Imagen } from 'src/app/models/Imagen';
import { Oferta } from 'src/app/models/Oferta';
import { OfertasImagenes } from 'src/app/models/OfertasImagenes';
import { FavoritosService } from 'src/app/services/favoritos.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css'],
})
export class FavoritosComponent {
  ofertas: any = [];
  favoritos!: Favorito[];
  ofertas_imagenes!: OfertasImagenes[];
  imagenes!: Imagen[];

  constructor(
    private favoritosService: FavoritosService,
    private tokenService: TokenStorageService
  ) {}

  ngOnInit(): void {
    // Obtiene todas las ofertas del servicio. Esto tendrá que ser modificado para que solo obtenga las ofertas favoritas
    const id_user = this.tokenService.getUser().id;
    if (id_user != undefined) {
      this.favoritosService.getFavoritosByUserId(id_user)
      .subscribe( fav_response => {
          this.favoritos = fav_response;
        },
        () => {},
        () => {
          if (this.favoritos.length > 0) {
            for (let i = 0; i < this.favoritos.length; i++) {
              if (this.favoritos[i].idOferta != null) {
                this.favoritosService
                  .getOfertasById(this.favoritos[i].idOferta)
                  .subscribe( res => {
                    this.ofertas.push({ ...res, favorito: true });
                  });
              }
            }
          }
          let getImagenesOferta = false;
          let getImagenes = false;
          this.favoritosService.getImagenesOferta().subscribe(
            (res) => {
              this.ofertas_imagenes = res;
            },
            () => {},
            () => {
              getImagenesOferta = true;
            }
          );
          this.favoritosService.getImagenes().subscribe(
            (res) => {
              this.imagenes = res;
            },
            () => {},
            () => {
              getImagenes = true;
              if (getImagenesOferta && getImagenes) {
                for (let i = 0; i < this.ofertas.length; i++) {
                  for (let j = 0; j < this.ofertas_imagenes.length; j++) {
                    if (
                      this.ofertas[i].id == this.ofertas_imagenes[j].idOferta
                    ) {
                      const id_imagen = this.ofertas_imagenes[i].idImagen;
                      let url_imagen = '';
                      let k = 0;
                      while(id_imagen != this.imagenes[k].id && k<this.imagenes.length){
                        k++
                      }
                      url_imagen = this.imagenes[k].url;
                      this.ofertas[i] = { ...this.ofertas[i], url: url_imagen };
                    }
                  }
                }                
              }
            }
          );
        }
      );
    }
  }
}
