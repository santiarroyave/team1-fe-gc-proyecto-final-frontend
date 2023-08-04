import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActividadesService } from 'src/app/services/actividades.service';
import { AlojamientosService } from 'src/app/services/alojamientos.service';
import { OfertasService } from 'src/app/services/ofertas.service';

declare var bootstrap: any;

@Component({
  selector: 'app-oferta-detalle',
  templateUrl: './oferta-detalle.component.html',
  styleUrls: ['./oferta-detalle.component.css'],
})
export class OfertaDetalleComponent implements OnInit {
  @ViewChild('liveToast', { static: true })
  toastLiveExampleRef!: ElementRef<HTMLElement>;
  oferta: any = {};
  alojamiento: any = {};
  actividad: any = {};

  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService,
    private alojamientosService: AlojamientosService,
    private actividadesService: ActividadesService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const elementId: number = Number(params['id']);
      this.oferta = this.ofertasService.getOfertaById(elementId);
      this.alojamiento = this.alojamientosService.getOfertaById(elementId);
      this.actividad = this.actividadesService.getActividadById(elementId);
    });
  }

  toastTrigger(): void {
    const toastLiveExample = document.getElementById('liveToast');

    const toastBootstrap = new bootstrap.Toast(toastLiveExample);
    toastBootstrap.show();
  }
}
