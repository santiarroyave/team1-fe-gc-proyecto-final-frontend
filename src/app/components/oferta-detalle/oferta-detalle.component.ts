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
  fotosGaleria:any = [];
  posicionFotoSeleccionada:number = 0;

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
    // Genera fotos para la galeria de ejemplo
    this.generadorListaFotos();
  }

  toastTrigger(): void {
    const toastLiveExample = document.getElementById('liveToast');

    const toastBootstrap = new bootstrap.Toast(toastLiveExample);
    toastBootstrap.show();
  }

  generadorListaActividades(){
    // Genera 10 actividades iguales para usarlas de ejemplo
    for (let i = 0; i < 10; i++) {
      this.listaActividades.push({
        id: i,
        titulo: "Portaventura " + i,
        descripcion: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto suscipit totam quam fugiat nemo magnam et perferendis distinctio cum? Quae earum ipsum aperiam, dolores quod iste non nisi mollitia eaque tempora rerum dolorum! Sunt optio amet repellat fuga quos aspernatur eum at impedit suscipit, quisquam voluptate est! Dolores, nam saepe.",
        imagen: "https://applications-media.feverup.com/image/upload/f_auto,w_550,h_550/fever2/plan/photo/0f30f6f2-d251-11ea-bf03-06551cb39bc6.jpg"
      })
    }
  }

  generadorListaFotos(){
    for (let i = 0; i < 5; i++) {
      this.fotosGaleria.push({
        id: i,
        url: "https://cdn.jumeirah.com/-/mediadh/dh/hospitality/jumeirah/hotels/dubai/burj-al-arab-jumeirah/hero/burj-al-arab-profile-exterior_6-4_landscape/burj-al-arab-profile-exterior_6-4_landscape__portrait.jpg?w=600"
      });
      this.fotosGaleria.push({
        id: i,
        url: "https://www.barcelo.com/guia-turismo/wp-content/uploads/2022/03/dubai-que-ver-pal.jpg"
      });
      this.fotosGaleria.push({
        id: i,
        url: "https://images.trvl-media.com/lodging/19000000/18660000/18658700/18658662/33793b1e.jpg?impolicy=resizecrop&rw=500&ra=fit"
      });
      this.fotosGaleria.push({
        id: i,
        url: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/19/6a/d1/18/dubai-suites.jpg?w=700&h=-1&s=1"
      });
    }
  }

  seleccionarImagenGaleria(id:number){
    // Buscar posicion del id en la lista
    this.posicionFotoSeleccionada; // Asignar posicion del id
  }
}
