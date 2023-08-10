import { Component } from '@angular/core';
import { OfertasService } from 'src/app/services/ofertas.service';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent {
  listaReservas: any[] = [];

  constructor(private ofertasService: OfertasService) {
    this.listaReservas = this.ofertasService.getAllReservas();
  }
}
