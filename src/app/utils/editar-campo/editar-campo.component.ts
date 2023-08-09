import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-editar-campo',
  templateUrl: './editar-campo.component.html',
  styleUrls: ['./editar-campo.component.css']
})
export class EditarCampoComponent {
  @Input() valor: any;
  @Input() nombreCampo: string = "";
  editSeleccionado: boolean = false;

  activadoEdit() {
    this.editSeleccionado = !this.editSeleccionado;
  }
}
