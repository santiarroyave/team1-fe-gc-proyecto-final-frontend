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
  descripcion: string = "";

  tituloEditSeleccionado: boolean = false;
  titulo: string = "";

  constructor(private route: ActivatedRoute, private actividadesService: ActividadesService, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.actividadId = params['id'];
      console.log(this.actividadId);
    });
    console.log("Hotel antes de llamar al servicio en el componente edit:");
    console.log(JSON.stringify(this.actividad));
    this.actividadesService.getActividadById(this.actividadId).subscribe(response => {
      this.actividad = response;
      console.log(this.actividad);
    });
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
      this.actividadesService.updateActividad(this.actividad);
      console.log("Hotel al iniciar el CONFIRAMR EDIT:");
      //compruevo si los cambios se han realizado correctamente
      console.log(JSON.stringify(this.actividadesService.getActividadById(this.actividadId)));
      this.router.navigate(['/admin/actividades']);
  }
}
