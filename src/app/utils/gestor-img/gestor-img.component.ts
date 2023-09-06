import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-gestor-img',
  templateUrl: './gestor-img.component.html',
  styleUrls: ['./gestor-img.component.css']
})
export class GestorImgComponent implements OnInit{

  listaFotos: string[] = [];

  
  ngOnInit(): void {
    // Genera fotos de ejemplo
    this.listaFotos.push("https://th.bing.com/th/id/R.51bfa400eed6f3c145874d76e8ada967?rik=XQOoCzTXoCjb9w&pid=ImgRaw&r=0");
    this.listaFotos.push("https://www.maldivas.net/f/maldivas/maldivas/guia/que-hacer-m.jpg");
    this.listaFotos.push("https://www.maldivas.net/f/maldivas/maldivas/guia/precios-m.jpg");
    this.listaFotos.push("https://media.todojujuy.com/p/d07063758b2e3b98e879496aa56bc2e9/adjuntos/227/imagenes/003/080/0003080610/islas-maldivas.jpg");
    this.listaFotos.push("https://s1.ppllstatics.com/lasprovincias/www/multimedia/202111/05/media/cortadas/maldivas-archi-kALB-U1501058601241BOI-1248x770@Las%20Provincias.jpg");
    this.listaFotos.push("https://dynl.mktgcdn.com/p/PdKIFm42x4ilTlmQqIo-hn9SeaU0eEOojHALpH1XPwc/540x450.jpg");
    this.listaFotos.push("https://okdiario.com/coolthelifestyle/img/2022/12/06/315316403_701382311388678_3695655104571569780_n.jpeg");
  }
  
  borrarFoto(url:string){
    // 1. Encuentra su posición dentro de la lista
    let posicion = this.listaFotos.findIndex((busqueda:any) => busqueda == url);
    // 2. Borra la actividad
    this.listaFotos.splice(posicion, 1);
  }

  // subirFoto(){
  //   this.listaFotos.unshift(""); 
  // }

  // uploadFile(event){
  //   const img = event.target.file[0];
  // }
}
