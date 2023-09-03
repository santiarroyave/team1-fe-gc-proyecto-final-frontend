import { Component, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlojamientosService } from 'src/app/services/alojamientos.service';

@Component({
  selector: 'app-editar-hotel',
  templateUrl: './editar-hotel.component.html',
  styleUrls: ['./editar-hotel.component.css']
})
export class EditarHotelComponent {

  hotel: any =  {
    "id": null,
    "nombre": "",
    "categoria": null,
    "web": "",
    "telefono": "",
    "email": "",
    "imagen": ""
  };
  hotelId: number = 0;
  constructor(private route: ActivatedRoute, private alojamientoService: AlojamientosService, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.hotelId = params['id'];
      console.log(this.hotelId);
    });
    console.log("Hotel antes de llamar al servicio en el componente edit:");
    console.log(JSON.stringify(this.hotel));
    this.hotel = this.alojamientoService.getAlojamientoById(this.hotelId);
    console.log("Hotel al iniciar el componente edit:");
    console.log(JSON.stringify(this.hotel));
  }


  nombreEditSeleccionado: boolean = false;
  categoriaEditSeleccionado: boolean = false;
  telefonoEditSeleccionado: boolean = false;
  emailEditSeleccionado: boolean = false;
  

  activadoNombreEdit(){
    this.nombreEditSeleccionado = !this.nombreEditSeleccionado
  }
  
  activadoCategoriaEdit() {
    this.categoriaEditSeleccionado = !this.categoriaEditSeleccionado;
  }

  activadoTelefonoEdit() {
    this.telefonoEditSeleccionado = !this.telefonoEditSeleccionado;
  }

  activadoEmailEdit() {
    this.emailEditSeleccionado = !this.emailEditSeleccionado;
  }


  
  confirmarEdicion(){
      console.log("Hotel al iniciar el CONFIRAMR EDIT:");
      console.log(JSON.stringify(this.hotel));
      this.alojamientoService.updateAlojamiento(this.hotel);
      console.log("Hotel al iniciar el CONFIRAMR EDIT:");
      //compruevo si los cambios se han realizado correctamente
      console.log(JSON.stringify(this.alojamientoService.getAlojamientoById(this.hotelId)));
      this.router.navigate(['/admin/hoteles']);
  }
}
  
  
  
  
  