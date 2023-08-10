import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-reserva-item',
  templateUrl: './reserva-item.component.html',
  styleUrls: ['./reserva-item.component.css']
})
export class ReservaItemComponent {
  @Input() reserva: any = {};
  @Output() detalle = new EventEmitter<string>();

  onDetalle() {
    this.detalle.emit(this.reserva.id);
  }
}
