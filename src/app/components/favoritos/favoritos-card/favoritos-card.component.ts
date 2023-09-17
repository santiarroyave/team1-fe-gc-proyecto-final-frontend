import { Component, Input, OnInit } from '@angular/core';
import { Imagen } from 'src/app/models/Imagen';
import { OfertasImagenes } from 'src/app/models/OfertasImagenes';
import { FavoritosService } from 'src/app/services/favoritos.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-favoritos-card',
  templateUrl: './favoritos-card.component.html',
  styleUrls: ['./favoritos-card.component.css'],
})
export class FavoritosCardComponent implements OnInit {
  @Input() ofertas: any;
  id_user!: number;

  constructor(private favoritosService: FavoritosService, private tokenService: TokenStorageService) {}

  ngOnInit(): void {       
    this.id_user = this.tokenService.getUser().id;
  }

  quitarFavorito(id_oferta:number,oferta:any): void{
    console.log(oferta);
    
    if(this.id_user != undefined){
      this.favoritosService.deleteFavorito(this.id_user,id_oferta)
      .subscribe(()=>{        
        this.actualizarListaFavoritos(id_oferta);
      });
    }
  }

  actualizarListaFavoritos(id_oferta:number): void{
    this.ofertas = this.ofertas.filter((oferta: { oferta: { id: number; }; }) => oferta.oferta.id != id_oferta);
  }
}
