import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlojamientoCompleto } from 'src/app/models/alojamientos/AlojamientoCompleto';

@Component({
  selector: 'app-hotel-item',
  templateUrl: './hotel-item.component.html',
  styleUrls: ['./hotel-item.component.css']
})
export class HotelItemComponent {
  // @Input() listaHoteles: any = [];
  @Input() alojamiento: AlojamientoCompleto = {} as AlojamientoCompleto;
  @Output() editar = new EventEmitter<number>();

  onEditar() {
    this.editar.emit(this.alojamiento.id);
  }
}
