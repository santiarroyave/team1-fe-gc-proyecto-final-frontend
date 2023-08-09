import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActividadesService } from 'src/app/services/actividades.service';

@Component({
  selector: 'app-editar-actividad',
  templateUrl: './editar-actividad.component.html',
  styleUrls: ['./editar-actividad.component.css']
})
export class EditarActividadComponent {
  actividad: any = {
    "titulo": "",
    "descripcion": "",
    "imagen": ""

  }

  actividadId: number = 0;

  descripcionEditSeleccionado: boolean = false;
  descripcion: string = "Ejemplo descripcion";

  tituloEditSeleccionado: boolean = false;
  titulo: string = "Ejemplo descripcion";

  constructor(private route: ActivatedRoute, private actividadService: ActividadesService, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.actividadId = params['id'];
      console.log(this.actividadId);
    });
    console.log("Hotel antes de llamar al servicio en el componente edit:");
    console.log(JSON.stringify(this.actividad));
    this.actividad = this.actividadService.getActividadById(this.actividadId);
    console.log("Hotel al iniciar el componente edit:");
    console.log(JSON.stringify(this.actividad));
  }
  activadoDescripcionEdit(){
      this.descripcionEditSeleccionado = !this.descripcionEditSeleccionado;
  }

  activadoTituloEdit(){
    this.tituloEditSeleccionado = !this.tituloEditSeleccionado;
  }

  confirmarEdit(){
      console.log("ACTIVIDAD al iniciar el CONFIRAMR EDIT:");
      console.log(JSON.stringify(this.actividad));
      this.actividadService.updateActividad(this.actividad);
      console.log("Hotel al iniciar el CONFIRAMR EDIT:");
      //compruevo si los cambios se han realizado correctamente
      console.log(JSON.stringify(this.actividadService.getActividadById(this.actividadId)));
      this.router.navigate(['/admin/actividades']);
  }
}
