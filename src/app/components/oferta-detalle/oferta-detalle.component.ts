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
  num_noches: number = 14;
  toastLiveExampleRef!: ElementRef<HTMLElement>;
  oferta: any = {};
  alojamiento: any = {};
  actividad: any = {};

  listaActividades:any = [];

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
      this.alojamiento = this.alojamientosService.getAlojamientoById(elementId);
      this.actividad = this.actividadesService.getActividadById(elementId);
    });

    // Genera actividades de ejemplo
    this.generadorListaActividades();
  }

  toastTrigger(): void {
    const toastLiveExample = document.getElementById('liveToast');

    const toastBootstrap = new bootstrap.Toast(toastLiveExample);
    toastBootstrap.show();
  }

  generadorListaActividades(){
    // Genera 10 iguales de ejemplo
    for (let i = 0; i < 10; i++) {
      this.listaActividades.push({
        id: i,
        titulo: "Portaventura " + i,
        descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto suscipit totam quam fugiat nemo magnam et perferendis distinctio cum? Quae earum ipsum aperiam, dolores quod iste non nisi mollitia eaque tempora rerum dolorum! Sunt optio amet repellat fuga quos aspernatur eum at impedit suscipit, quisquam voluptate est! Dolores, nam saepe.",
        imagen: "https://applications-media.feverup.com/image/upload/f_auto,w_550,h_550/fever2/plan/photo/0f30f6f2-d251-11ea-bf03-06551cb39bc6.jpg"
      })
      
      
    }
  }
}
