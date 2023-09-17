import { Component } from '@angular/core';
import { Favorito } from 'src/app/models/Favorito';
import { Imagen } from 'src/app/models/Imagen';
import { Oferta } from 'src/app/models/Oferta';
import { OfertaCard } from 'src/app/models/OfertaCard';
import { OfertasImagenes } from 'src/app/models/OfertasImagenes';
import { FavoritosService } from 'src/app/services/favoritos.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css'],
})
export class FavoritosComponent {
  ofertas: OfertaCard[] = [];

  constructor(
    private favoritosService: FavoritosService,
    private tokenService: TokenStorageService
  ) {}

  ngOnInit(): void {
    const idUsuario = this.tokenService.getUser().id;
    this.favoritosService.getFavoritosByUserId(idUsuario).subscribe((response) => {
      this.ofertas = response;
    });
  }
}
