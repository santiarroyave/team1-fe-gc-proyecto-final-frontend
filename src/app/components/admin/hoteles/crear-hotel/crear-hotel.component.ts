import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AlojamientosService } from 'src/app/services/alojamientos.service';

@Component({
  selector: 'app-crear-hotel',
  templateUrl: './crear-hotel.component.html',
  styleUrls: ['./crear-hotel.component.css']
})
export class CrearHotelComponent {
  nombre: string = '';
  categoria: string = '';
  web: string = '';
  telefono: string = '';
  email: string = '';
  imagen: string = '';

  constructor(private alojamientoService: AlojamientosService, private router: Router) {}

  addHotel(){
    const nuevoAlojamiento: any = {
      nombre: this.nombre,
      categoria: this.categoria,
      web: this.web,
      telefono: this.telefono,
      email: this.email,
      imagen: this.imagen
    };

    this.alojamientoService.addAlojamiento(nuevoAlojamiento);
    this.router.navigate(['/admin/hoteles']);
  }
}
