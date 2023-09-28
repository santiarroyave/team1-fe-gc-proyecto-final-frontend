import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfertasService } from 'src/app/services/ofertas.service';
import { ReservasService } from 'src/app/services/reservas.service';

@Component({
  selector: 'app-reserva-detalle',
  templateUrl: './reserva-detalle.component.html',
  styleUrls: ['./reserva-detalle.component.css'],
})
export class ReservaDetalleComponent implements OnInit {
  reserva: any = {};
  id: number = 0;
  precio_total!:number;

  constructor(private route: ActivatedRoute,private reservasService: ReservasService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    this.reservasService.getReservaById(this.id).subscribe(reservaResponse => {
      this.reserva = reservaResponse;
      console.log("Reserva-detalle");
      console.log(this.reserva);
      const fFinal:Date = new Date(this.reserva.fechaFinal);
      const fIni:Date = new Date(this.reserva.fechaIni);
      const difMilisegundos = fFinal.getTime() - fIni.getTime();
      const total_noches = difMilisegundos / (24 * 60 * 60 * 1000);
      this.precio_total = this.reserva.precioOferta * total_noches;
    });
  }
}
