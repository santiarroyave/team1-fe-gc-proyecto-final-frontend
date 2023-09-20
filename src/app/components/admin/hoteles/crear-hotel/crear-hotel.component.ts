import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Servicio, ServicioIdName } from 'src/app/models/Servicio';
import { AlojamientoCrear } from 'src/app/models/alojamientos/AlojamientoCrear';
import { AlojamientosService } from 'src/app/services/alojamientos.service';
import { ServiciosAlojamientoService } from 'src/app/services/servicios-alojamiento.service';
import { GestorImgComponent } from 'src/app/utils/gestor-img/gestor-img.component';

@Component({
  selector: 'app-crear-hotel',
  templateUrl: './crear-hotel.component.html',
  styleUrls: ['./crear-hotel.component.css']
})
export class CrearHotelComponent {
  @ViewChild(GestorImgComponent) galeriaFotos!:GestorImgComponent;
  serviciosAll: ServicioIdName[] = [];
  serviciosSelect: any = [];

  //atributos del formulario. (Modelo: alojamientoCrear)
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
  serviciosId:number[] = [];


  constructor(private alojamientoService: AlojamientosService, private serviciosService: ServiciosAlojamientoService, private router: Router) {}

  ngOnInit(): void {
    // Importa los servicios disponibles en la BBDD
    this.serviciosService.getAllServicios().subscribe(result => {
      this.serviciosAll = result;

      // me aseguro de que el array recibido del servicio sigue el modelo de datos ServicioIdName, pero despues se lo asigno a un array de tipo any para poder añadirle la propiedad select
      this.serviciosSelect = this.serviciosAll;
      
      // Añade clave select y los establece como desactivados
      for (let i = 0; i < this.serviciosAll.length; i++) {
        this.serviciosSelect[i].select = false;
      }
    });
  }

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
      imagenes: this.imagenes,
      servicios: this.serviciosId
    };

    this.alojamientoService.addAlojamiento(nuevoAlojamiento);
    this.router.navigate(['/admin/hoteles']);
  }
}
