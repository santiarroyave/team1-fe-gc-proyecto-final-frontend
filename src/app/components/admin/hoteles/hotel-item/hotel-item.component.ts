import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlojamientoCard } from 'src/app/models/alojamientos/AlojamientoCard';
import { AlojamientoCompleto } from 'src/app/models/alojamientos/AlojamientoCompleto';

@Component({
  selector: 'app-hotel-item',
  templateUrl: './hotel-item.component.html',
  styleUrls: ['./hotel-item.component.css']
})
export class HotelItemComponent {
  // @Input() listaHoteles: any = [];
  @Input() alojamiento: AlojamientoCard = {} as AlojamientoCard;
  @Output() editar = new EventEmitter<number>();

  categoriaMostrar: string = "";

  constructor() {
  }

  ngOnInit(): void {
    switch (this.alojamiento.categoria) {
      case 0:
        this.categoriaMostrar = "";
        break;
      case 1:
        this.categoriaMostrar = "★";
        break;
      case 2:
        this.categoriaMostrar = "★★";
        break;
      case 3:
        this.categoriaMostrar = "★★★";
        break;
      case 4:
        this.categoriaMostrar = "★★★★";
        break;
      case 5:
        this.categoriaMostrar = "★★★★★";
        break;
      default:
        this.categoriaMostrar = "";
        break;
    }
  }


  onEditar() {
    this.editar.emit(this.alojamiento.id);
  }
}
