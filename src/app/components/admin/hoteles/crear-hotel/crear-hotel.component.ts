import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AlojamientoCrear } from 'src/app/models/alojamientos/AlojamientoCrear';
import { AlojamientosService } from 'src/app/services/alojamientos.service';

@Component({
  selector: 'app-crear-hotel',
  templateUrl: './crear-hotel.component.html',
  styleUrls: ['./crear-hotel.component.css']
})
export class CrearHotelComponent {

  nombre: string = '';
  categoria: string = '';
  telefono: string = '';
  email: string = '';
  pais: string = '';
  calle: string = '';
  numero: number = 0;
  codigoPostal: string = '';
  provincia: string = '';
  localidad: string = '';
  imagenes: string[] = [];

  serviciosAlojamiento: string[] = ["Wifi", "Lavadora", "Aire acondicionado", "Cocina", "Secadora", "Calefacción", "Zona para trabajar", "Televisión", "Piscina", "Desayuno", "Gimnasio"];

  constructor(private alojamientoService: AlojamientosService, private router: Router) {}

  addHotel(){
    const nuevoAlojamiento: AlojamientoCrear = {
      nombre: this.nombre,
      categoria: this.categoria,
      telefono: this.telefono,
      email: this.email,
      pais: this.pais,
      calle: this.calle,
      numero: this.numero,
      codigoPostal: this.codigoPostal,
      provincia: this.provincia,
      localidad: this.localidad,
      imagenes: this.imagenes
    };

    this.alojamientoService.addAlojamiento(nuevoAlojamiento);
    this.router.navigate(['/admin/hoteles']);
  }
}
