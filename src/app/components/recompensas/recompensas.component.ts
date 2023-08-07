import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-recompensas',
  templateUrl: './recompensas.component.html',
  styleUrls: ['./recompensas.component.css']
})
export class RecompensasComponent {
  menuColapsado = false;
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
}
