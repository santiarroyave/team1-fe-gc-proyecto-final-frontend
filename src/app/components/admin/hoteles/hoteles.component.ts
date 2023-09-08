import { Component } from '@angular/core';
import { AlojamientosService } from 'src/app/services/alojamientos.service';

@Component({
  selector: 'app-hoteles',
  templateUrl: './hoteles.component.html',
  styleUrls: ['./hoteles.component.css']
})
export class HotelesComponent {
  alojamientos: any = [];

  constructor(private alojamientoService: AlojamientosService) {}

  ngOnInit(): void {
    this.alojamientoService.getAllAlojamientos().subscribe(response => {
      this.alojamientos = response;
      console.log(this.alojamientos);
    });
  }
}
