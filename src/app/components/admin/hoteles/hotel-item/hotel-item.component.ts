import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-hotel-item',
  templateUrl: './hotel-item.component.html',
  styleUrls: ['./hotel-item.component.css']
})
export class HotelItemComponent {
  // @Input() listaHoteles: any = [];
  @Input() alojamiento: any;
  @Output() editar = new EventEmitter<string>();

  onEditar() {
    this.editar.emit(this.alojamiento.id);
  }
}
