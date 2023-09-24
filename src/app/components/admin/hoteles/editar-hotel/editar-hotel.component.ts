import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlojamientoCompleto } from 'src/app/models/alojamientos/AlojamientoCompleto';
import { AlojamientosService } from 'src/app/services/alojamientos.service';

@Component({
  selector: 'app-editar-hotel',
  templateUrl: './editar-hotel.component.html',
  styleUrls: ['./editar-hotel.component.css']
})
export class EditarHotelComponent {

  alojamiento: AlojamientoCompleto =  {
    id: 0,
    nombre: "",
    categoria: 0,
    telefono: "",
    email: "",
    direccion: {
        id: 0,
        pais: "",
        calle: "",
        numero: 0,
        codigoPostal: "",
        provincia: "",
        localidad: ""
    },
    imagenes: [],
    servicios: []
  };
  
  paisEditSeleccionado: boolean = false;
  calleEditSeleccionado: boolean = false;
  numeroEditSeleccionado: boolean = false;
  CPEditSeleccionado: boolean = false;
  provinciaEditSeleccionado: boolean = false;
  localidadEditSeleccionado: boolean = false;
  nombreEditSeleccionado: boolean = false;
  categoriaEditSeleccionado: boolean = false;
  telefonoEditSeleccionado: boolean = false;
  emailEditSeleccionado: boolean = false;

  constructor(private route: ActivatedRoute, private alojamientoService: AlojamientosService, private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.alojamiento.id = params['id'];
    });
    this.alojamientoService.getAlojamientoById(this.alojamiento.id).subscribe(
      (response) => {
        this.alojamiento = response;
      }
    );
  }

  

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

  activadoPaisEdit(){
    this.paisEditSeleccionado = !this.paisEditSeleccionado;
  }

  activadoCalleEdit(){
    this.calleEditSeleccionado = !this.calleEditSeleccionado;
  }

  activadoNumeroEdit(){
    this.numeroEditSeleccionado = !this.numeroEditSeleccionado;
  }

  activadoCPEdit(){
    this.CPEditSeleccionado = !this.CPEditSeleccionado;
  }

  activadoProvinciaEdit(){
    this.provinciaEditSeleccionado = !this.provinciaEditSeleccionado;
  }

  activadoLocalidadEdit(){
    this.localidadEditSeleccionado = !this.localidadEditSeleccionado;
  }


  
  confirmarEdicion(){
    this.alojamientoService.updateAlojamiento(this.alojamiento).subscribe(
      (response) => {
        console.log("Actividad actualizada correctamente");
        console.log(this.alojamiento);
      },
      (error) => {
        console.error("Error al actualizar la actividad:", error);
      }
    );
  }
}
  
  
  
  
  