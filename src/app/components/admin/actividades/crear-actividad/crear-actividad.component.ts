import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActividadesService } from 'src/app/services/actividades.service';

@Component({
  selector: 'app-crear-actividad',
  templateUrl: './crear-actividad.component.html',
  styleUrls: ['./crear-actividad.component.css']
})
export class CrearActividadComponent {
  titulo: string = "";
  descripcion: string = "";
  imagen: string = "";

  constructor(private actividadService: ActividadesService, private router: Router) {}

  addActividad(){
    const nuevaActividad: any = {
        titulo: this.titulo,
        descripcion: this.descripcion,
        imagen: this.imagen
    };

    this.actividadService.addActividad(nuevaActividad);
    this.router.navigate(["/admin/actividades"]);
  }
}
