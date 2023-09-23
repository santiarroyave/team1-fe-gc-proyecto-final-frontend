import { Component, Input, OnInit } from '@angular/core';
import { OfertaCard } from 'src/app/models/OfertaCard';
import { FavoritosService } from 'src/app/services/favoritos.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-favoritos-card',
  templateUrl: './favoritos-card.component.html',
  styleUrls: ['./favoritos-card.component.css'],
})
export class FavoritosCardComponent implements OnInit {
@Input() ofertas: OfertaCard[] = [];

  favorito: boolean;

  id_user!: number;

  constructor(private favoritosService: FavoritosService, private tokenService: TokenStorageService) {
    this.favorito = true;
  }

  ngOnInit(): void {       
    this.id_user = this.tokenService.getUser().id;
  }

  BorrarFavorito(ofertaId: number) {
    if (this.favorito == true) {
      const index = this.ofertas.findIndex((oferta) => oferta.id === ofertaId);
          if (index !== -1)
            this.ofertas.splice(index, 1);
          
      this.favoritosService.deleteFavorito(this.id_user, ofertaId).subscribe(
        (response) => {
          console.log("Oferta eliminada de favoritos:", response);
        },
        (error) => {
          console.error("Error al eliminar la oferta de favoritos:", error);
        }
      );
    }
  }
}
