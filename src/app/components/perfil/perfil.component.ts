import { Component, HostListener, OnInit } from '@angular/core';
import { Direccion } from 'src/app/models/Direccion';
import { Usuario } from 'src/app/models/Usuario';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  menuColapsado = false;
  currentUser: any;

  editMode: boolean = false;
  loading: boolean = false;


  usuario: Usuario = {
    id: 0,
    email: '',
    nombre: '',
    apellidos: '',
    telefono: '',
    fechaNacimiento: '',
    pass: '',
    idDireccion: 0,
    puntos: 0,
    experiencia: 0,
    nivel: '',
    admin: false
  };
  
  direccion: Direccion = {
    id: 0,
    pais: '',
    calle: '',
    localidad: '',
    provincia: '',
    codigoPostal: '',
    numero: 0
  };

  constructor(private tokenStorageService: TokenStorageService, private UsuarioService: UserService, private tokenService: TokenStorageService){}

  ngOnInit(): void {
    this.currentUser = this.tokenStorageService.getUser();
    const id_user = this.tokenService.getUser().id;
  
    this.UsuarioService.getUser(id_user).subscribe(
      (response) => {
        this.usuario = response;
  
        if (this.usuario.idDireccion) {
          this.UsuarioService.getUserDireccion(this.usuario.idDireccion).subscribe(
            (direccionResponse) => {
              this.direccion = direccionResponse;
            },
            (error) => {
              console.error('Error al obtener la dirección:', error);
            }
          );
        }
      },
      (error) => {
        console.error('Error al obtener el usuario:', error);
      }
    );
  }

  // Escucha el evento 'resize' en la ventana del navegador (host).
  // Cuando la ventana cambia de tamaño (por ejemplo, se cambia el tamaño de la pantalla o se rota el dispositivo móvil),
  // se ejecuta la función 'onResize()'.
  // El parámetro '$event' captura los datos del evento que contiene información sobre el cambio de tamaño de la ventana.
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.detectScreenSize();
  }

  // Esta función detecta cuando la pantalla llega al limite de colapsamiento del menu
  detectScreenSize() {
    let windowWidth = window.innerWidth;
    let limite = 992;

    if(windowWidth < limite){
      this.menuColapsado = true;
    }else{
      this.menuColapsado = false;
    }
  }

  openFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  handleFileChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const file = inputElement.files?.[0];
    if (file) {
      // Aquí puedes hacer lo que necesites con el archivo seleccionado.
      console.log('Archivo seleccionado:', file.name);
    }
  }

  permitirEditar() {
    if (this.editMode) {
      // Muestra la animación de carga caundo le das a guardar
      this.loading = true;
  
      this.UsuarioService.updateDireccionUser(this.direccion).subscribe(
        (response) => {
          console.log("Dirección actualizada correctamente");
          console.log(this.direccion);
        },
        (error) => {
          console.error("Error al actualizar la dirección:", error);
        }
      );
  
      this.UsuarioService.updateUser(this.usuario).subscribe(
        (response) => {
          console.log("Usuario actualizado correctamente");
          console.log(this.usuario);
          
          // con 2 segundos en pricnipio hay suficiente para que los datos se hayan actualizado
          setTimeout(() => {
            this.loading = false;
            // despues del tiempo de espera recarga la pagina
            window.location.reload();
          }, 2000);
        },
        (error) => {
          console.error("Error al actualizar el usuario:", error);
        }
      );
    }
    // Cambia el estado de editMode
    this.editMode = !this.editMode;
  }  
}