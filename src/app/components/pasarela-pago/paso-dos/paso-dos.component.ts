import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfertasService } from 'src/app/services/ofertas.service';

@Component({
  selector: 'app-paso-dos',
  templateUrl: './paso-dos.component.html',
  styleUrls: ['./paso-dos.component.css']
})
export class PasoDosComponent {
  oferta: any;
  precio: any;

  constructor(private route: ActivatedRoute, private ofertasService: OfertasService){}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const elementId: number = Number(params['id']);
      this.oferta = this.ofertasService.getOfertaById(elementId);
    });
    this.precio = this.ofertasService.oferta;
  }

  // pagar(){

  //   const reserva = {
  //     IdOferta: this.oferta.id,
  //     IdUsuario: this.id_usuario,
  //     fechaInicio: ,
  //     fechaFin: this.fechaFin,
  //     estado: "Completada"
  //   }
  // }
}
