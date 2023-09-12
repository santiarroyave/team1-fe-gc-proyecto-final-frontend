import { Component } from '@angular/core';

// import { fotoSanti } from '../../../assets/about';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  datosEquipo:any[];
  fullStack: string;

  constructor(){
    this.datosEquipo = [];
    this.fullStack = "Full Stack Developer (.NET)";

    this.datosEquipo.push({
      nombre: "Santi Arroyave",
      urlFoto: "../../../assets/about/foto-santi.jpeg",
      linkGithub: "https://github.com/santiarroyave",
      linkLinkedin: "https://www.linkedin.com/in/santiarroyave/",
      descripcion: ""
    });
    this.datosEquipo.push({
      nombre: "Albert Esponey",
      urlFoto: "../../../assets/about/foto-albert.jpg",
      linkGithub: "https://github.com/AlbertEsponey4",
      linkLinkedin: "https://www.linkedin.com/in/albert-esponey/",
      descripcion: ""
    });
    this.datosEquipo.push({
      nombre: "Jhon del Águila",
      urlFoto: "../../../assets/about/foto-jhon.jpeg",
      linkGithub: "https://github.com/jhondelaguila",
      linkLinkedin: "https://www.linkedin.com/in/jhondelaguila/",
      descripcion: ""
    });
  }
}
