import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs';
import { ActividadesService } from 'src/app/services/actividades.service';
import { IActividadCrear } from '../../../../models/IActividadCrear';


@Component({
  selector: 'app-crear-actividad',
  templateUrl: './crear-actividad.component.html',
  styleUrls: ['./crear-actividad.component.css']
})
export class CrearActividadComponent {
  titulo: string = "";
  descripcion: string = "";
  pais: string = "";
  calle: string = "";
  numero: number = 0;
  codigoPostal: string = "";
  provincia: string = "";
  localidad: string = "";
  imagenes: string[] = [];
  imagen: string = "";

  constructor(private actividadesService: ActividadesService, private router: Router) {}

  addActividad(){
    const nuevaActividad: IActividadCrear = {
      titulo: this.titulo,
      descripcion: this.descripcion,
      pais: this.pais,
      calle: this.calle, 
      numero: this.numero,
      codigoPostal: this.codigoPostal, 
      provincia: this.provincia,
      localidad: this.localidad, 
      imagenes: [this.imagen]
    }
    this.actividadesService.addActividad(nuevaActividad);
    this.router.navigate(["/admin/actividades"]);
  }
}
