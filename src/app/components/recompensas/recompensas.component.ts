import { Component, HostListener } from '@angular/core';
import { Nivel } from 'src/app/models/Nivel';
import { RecompensasService } from 'src/app/services/recompensas.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

declare var bootstrap: any;


@Component({
  selector: 'app-recompensas',
  templateUrl: './recompensas.component.html',
  styleUrls: ['./recompensas.component.css']
})
export class RecompensasComponent {
  id_nivel: number | any;
  nivel: Nivel | any;
  menuColapsado = false;
  valor_nivel: number = 0;
  experiencia_usuario: number = 500;
  porcentage_exp:number = 0;

  constructor(private tokenStorageService: TokenStorageService, private recompensasService: RecompensasService){}

  // Escucha el evento 'resize' en la ventana del navegador (host).
  // Cuando la ventana cambia de tamaño (por ejemplo, se cambia el tamaño de la pantalla o se rota el dispositivo móvil),
  // se ejecuta la función 'onResize()'.
  // El parámetro '$event' captura los datos del evento que contiene información sobre el cambio de tamaño de la ventana.
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.detectScreenSize();
  }

  ngOnInit(): void {
    // Detecta el tamaño de la pantalla para colapsar el menu
    this.detectScreenSize();
    this.id_nivel = this.tokenStorageService.getUser().id_nivel;
    // this.experiencia_usuario = this.tokenStorageService.getUser().experiencia;

    if(this.id_nivel!=null){
      this.recompensasService.getNivelesById(this.id_nivel).subscribe( res => {
        this.nivel = res;
        console.log(res);
        
        switch(this.nivel.nombre){
          case 'Oro': this.valor_nivel = 1; break;
          case 'Platino': this.valor_nivel = 2; break;
          case 'Diamante': this.valor_nivel = 3; break;
        }
      });
    }

    let barra = document.getElementById("barra-progreso");
    this.porcentage_exp = Math.floor(this.experiencia_usuario*100/3000);
    
    if(barra != null){
      barra.style.width = this.porcentage_exp.toString()+'%';
    }
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

  modalTrigger(): void {
    const modalLiveExample = document.getElementById('liveModal');

    const modalBootstrap = new bootstrap.Toast(modalLiveExample);
    modalBootstrap.show();
  }
}
