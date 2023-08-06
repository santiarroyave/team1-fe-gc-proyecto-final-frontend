import { Component } from '@angular/core';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  scroll:boolean = false;

  @HostListener("window:scroll", ['$event'])
  doSomethingOnWindowScroll($event:Event){
    this.navegarABuscador();
    this.scroll = true;
  }
  
  // Hace scroll hasta el buscador
  navegarABuscador() {
    let elemento = document.getElementById("buscador");
    if (elemento && this.scroll == false) {
      elemento.scrollIntoView({ behavior: 'smooth' });
    }
  }
  
}
