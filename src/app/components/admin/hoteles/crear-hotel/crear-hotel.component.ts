import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlojamientoCrear } from 'src/app/models/alojamientos/AlojamientoCrear';
import { AlojamientosService } from 'src/app/services/alojamientos.service';
import { GestorImgComponent } from 'src/app/utils/gestor-img/gestor-img.component';

@Component({
  selector: 'app-crear-hotel',
  templateUrl: './crear-hotel.component.html',
  styleUrls: ['./crear-hotel.component.css']
})
export class CrearHotelComponent {
  @ViewChild(GestorImgComponent) galeriaFotos!:GestorImgComponent;

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
    if (this.galeriaFotos){
      this.galeriaFotos.uploadImages()
      .then((urls) => {
        // Agrega las URLs creadas a la lista de URLs
        for (let i = 0; i < urls.length; i++) {
          this.imagenes.push(urls[i]); 
        }
        console.log(urls);

      })
      .catch((error) => {
        // Maneja cualquier error que pueda ocurrir durante la carga de imágenes
        console.error('Error al cargar imágenes:', error);
      });
    }

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
