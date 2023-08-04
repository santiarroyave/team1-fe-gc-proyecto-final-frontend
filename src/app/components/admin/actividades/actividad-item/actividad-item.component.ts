import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-actividad-item',
  templateUrl: './actividad-item.component.html',
  styleUrls: ['./actividad-item.component.css']
})
export class ActividadItemComponent {
  @Input() listaActividades: any = [];
}
