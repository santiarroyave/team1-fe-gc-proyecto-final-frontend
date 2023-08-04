import { Component } from '@angular/core';
import { AlojamientosService } from 'src/app/services/alojamientos.service';
import { OfertasService } from 'src/app/services/ofertas.service';

@Component({
  selector: 'app-hoteles',
  templateUrl: './hoteles.component.html',
  styleUrls: ['./hoteles.component.css']
})
export class HotelesComponent {
  hoteles: any = [];

  constructor(private ofertasService: AlojamientosService) {}

  ngOnInit(): void {
      this.hoteles = this.ofertasService.getAllAlojamientos();
  }
}
