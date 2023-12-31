import { Component } from '@angular/core';
import { AlojamientoCard } from 'src/app/models/alojamientos/AlojamientoCard';
import { AlojamientosService } from 'src/app/services/alojamientos.service';

@Component({
  selector: 'app-hoteles',
  templateUrl: './hoteles.component.html',
  styleUrls: ['./hoteles.component.css']
})
export class HotelesComponent {
  alojamientos: AlojamientoCard[] | null;

  constructor(private alojamientoService: AlojamientosService) {
    this.alojamientos = null;
  }

  ngOnInit(): void {
    this.alojamientoService.getAllAlojamientos().subscribe(response => {
      this.alojamientos = response;
      console.log(this.alojamientos);
    });
  }
}
