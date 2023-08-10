import { Component } from '@angular/core';
import { OfertasService } from 'src/app/services/ofertas.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent {

  listaOfertas: any = [];

  constructor(private ofertasService: OfertasService){ };

  ngOnInit(): void {
    // Obtiene todas las ofertas del servicio. Esto tendrá que ser modificado para que solo obtenga las ofertas favoritas
    this.listaOfertas = this.ofertasService.getAllOfertas();
  }
}
