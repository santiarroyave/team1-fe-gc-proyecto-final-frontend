import { Component, Input } from '@angular/core';
import { ActividadCard } from 'src/app/models/actividades/ActividadCard';

@Component({
  selector: 'app-actividad-item',
  templateUrl: './actividad-item.component.html',
  styleUrls: ['./actividad-item.component.css']
})
export class ActividadItemComponent {
  @Input() listaActividades: ActividadCard[] = [];
}
