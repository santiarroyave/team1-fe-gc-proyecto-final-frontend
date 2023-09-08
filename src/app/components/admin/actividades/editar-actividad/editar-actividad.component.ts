import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActividadCrear } from '../../../../models/ActividadCrear';
import { ActividadesService } from 'src/app/services/actividades.service';
import { ActividadCompleta } from 'src/app/models/ActividadCompleta';


@Component({
  selector: 'app-editar-actividad',
  templateUrl: './editar-actividad.component.html',
  styleUrls: ['./editar-actividad.component.css']
})
export class EditarActividadComponent {
  actividad: ActividadCompleta = {
    "id": 0,
    "titulo": "",
    "descripcion": "",
    "idDireccion": 0,
    "pais": "",
    "calle": "",
    "numero": 0,
    "codigoPostal": "",
    "provincia": "",
    "localidad": "",
    "imagenes": []
  }

  actividadId: number = 0;

  tituloEditSeleccionado: boolean = false;
  titulo: string = "";

  descripcionEditSeleccionado: boolean = false;
  descripcion: string = "";

  paisEditSeleccionado: boolean = false;
  pais: string = "";

  calleEditSeleccionado: boolean = false;
  calle: string = "";

  numeroEditSeleccionado: boolean = false;
  numero: number = 0;

  CPEditSeleccionado: boolean = false;
  CP: string = "";

  provinciaEditSeleccionado: boolean = false;
  provincia: string = "";

  localidadEditSeleccionado: boolean = false;
  localidad: string = "";

  constructor(private route: ActivatedRoute, private actividadesService: ActividadesService, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.actividadId = params['id'];
      console.log(this.actividadId);
    });
    console.log("Hotel antes de llamar al servicio en el componente edit:");
    console.log(JSON.stringify(this.actividad));

    this.actividadesService.getActividadById(this.actividadId).subscribe(
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
