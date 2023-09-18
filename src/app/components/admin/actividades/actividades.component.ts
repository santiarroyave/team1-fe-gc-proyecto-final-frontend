import { Component } from '@angular/core';
import { ActividadCard } from 'src/app/models/actividades/ActividadCard';
import { ActividadesService } from 'src/app/services/actividades.service';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent {
  actividades: ActividadCard[] | null;

  constructor(private actividadesService: ActividadesService) {
    this.actividades = null
  }

  ngOnInit(): void {
    this.actividadesService.getAllActividades().subscribe(response => {
      this.actividades = response;
      console.log(this.actividades);
    });
  }
}
