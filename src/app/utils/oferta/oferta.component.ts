import { Component, OnInit } from '@angular/core';
import { Favorito } from 'src/app/models/Favorito';
import { OfertaFiltros } from 'src/app/models/OfertaFiltros';
import { FavoritosService } from 'src/app/services/favoritos.service';
import { HomeService } from 'src/app/services/home.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css']
})
export class OfertaComponent implements OnInit{
  
  ofertas:OfertaFiltros[] = [];

  constructor(private tokenStorageService: TokenStorageService, private favoritosService: FavoritosService, private homeService: HomeService){ };
  
  // Obtiene la información de la oferta haciendo una llamada al servidor por IP
  ngOnInit(): void {
      this.homeService.getOfertasFiltradas$().subscribe(ofertas => {
      this.ofertas = ofertas;
    });
  }
  
  favorito(oferta:any){
    const id_user = this.tokenStorageService.getUser().id;
    const id_oferta = oferta.oferta.id;
    if (!oferta.favorito){
      oferta.favorito = true;
      const fav:Favorito = {
        idOferta: id_oferta,
        idUsuario: id_user
      }
      this.favoritosService.createFavorito(fav).subscribe();
    }else{
      oferta.favorito = false;
      this.favoritosService.deleteFavorito(id_user,id_oferta).subscribe();
    }
  }
  
  // funcion que calcula el tiempo restante de  la oferta, y si esta caducada o no. (Si esta caducada se le aplican estilos diferentes en el HTML)
  calcularTiempoRestante(fecha: string): { texto: string; caducada: boolean } {
    const fecha_actual = new Date();
    const fecha_fin = new Date(fecha);
  
    const tiempoDiferencia = fecha_fin.getTime() - fecha_actual.getTime();
  
    const dias = Math.floor(tiempoDiferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((tiempoDiferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
    if (horas < 0 || dias < 0) {
      return { texto: 'Oferta caducada', caducada: true };
    } else {
      return { texto: `${dias} días y ${horas} horas!`, caducada: false };
    }
  }  
}


