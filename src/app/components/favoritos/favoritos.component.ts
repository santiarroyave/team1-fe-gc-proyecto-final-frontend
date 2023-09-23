import { Component } from '@angular/core';
import { OfertaCard } from 'src/app/models/OfertaCard';
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
