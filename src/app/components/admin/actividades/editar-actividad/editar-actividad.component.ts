import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActividadCrear } from '../../../../models/actividades/ActividadCrear';
import { ActividadesService } from 'src/app/services/actividades.service';
import { ActividadCompleta } from 'src/app/models/actividades/ActividadCompleta';


@Component({
  selector: 'app-editar-actividad',
  templateUrl: './editar-actividad.component.html',
  styleUrls: ['./editar-actividad.component.css']
})
export class EditarActividadComponent {
  actividad: ActividadCompleta = {
    id: 0,
    titulo: "",
    descripcion: "",
    direccion: {
        id: 0,
        pais: "",
        calle: "",
        numero: 0,
        codigoPostal: "",
        provincia: "",
        localidad: ""
    },
    imagenes: []
  };

  tituloEditSeleccionado: boolean = false;
  descripcionEditSeleccionado: boolean = false;
  paisEditSeleccionado: boolean = false;
  calleEditSeleccionado: boolean = false;
  numeroEditSeleccionado: boolean = false;
  CPEditSeleccionado: boolean = false;
  provinciaEditSeleccionado: boolean = false;
  localidadEditSeleccionado: boolean = false;

  constructor(private route: ActivatedRoute, private actividadesService: ActividadesService, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.actividad.id= params['id'];
    });
    console.log("Hotel antes de llamar al servicio en el componente edit:");
    console.log(JSON.stringify(this.actividad));

    this.actividadesService.getActividadById(this.actividad.id).subscribe(
      (response) => {
        this.actividad = response;
      }
    );
    
    console.log("Hotel al iniciar el componente edit:");
    console.log(JSON.stringify(this.actividad));
  }

  activadoDescripcionEdit(){
      this.descripcionEditSeleccionado = !this.descripcionEditSeleccionado;
  }

  activadoTituloEdit(){
    this.tituloEditSeleccionado = !this.tituloEditSeleccionado;
  }

  activadoPaisEdit(){
    this.paisEditSeleccionado = !this.paisEditSeleccionado;
  }

  activadoCalleEdit(){
    this.calleEditSeleccionado = !this.calleEditSeleccionado;
  }

  activadoNumeroEdit(){
    this.numeroEditSeleccionado = !this.numeroEditSeleccionado;
  }

  activadoCPEdit(){
    this.CPEditSeleccionado = !this.CPEditSeleccionado;
  }

  activadoProvinciaEdit(){
    this.provinciaEditSeleccionado = !this.provinciaEditSeleccionado;
  }

  activadoLocalidadEdit(){
    this.localidadEditSeleccionado = !this.localidadEditSeleccionado;
  }

  confirmarEdit(){
    this.actividadesService.updateActividad(this.actividad).subscribe(
      (response) => {
        console.log("Actividad actualizada correctamente");
        console.log(this.actividad);
      },
      (error) => {
        console.error("Error al actualizar la actividad:", error);
      }
    );
  }
}
