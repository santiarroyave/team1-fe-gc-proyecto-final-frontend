import { Component, Input, OnInit } from '@angular/core';
import { OfertasService } from 'src/app/services/ofertas.service';


@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css']
})
export class OfertaComponent implements OnInit{
  
  @Input() ofertaId: any;

  favoritoActivo:boolean = false;
  oferta:any;

  constructor(private ofertasService: OfertasService){ };
  
  // Obtiene la información de la oferta haciendo una llamada al servidor por IP
  ngOnInit(): void {
    this.oferta = this.ofertasService.getOfertaById(this.ofertaId);
  }
  
  favorito(){
    if (this.favoritoActivo == false){
      this.favoritoActivo = true;
    }else{
      this.favoritoActivo = false;
    }
  }
}
