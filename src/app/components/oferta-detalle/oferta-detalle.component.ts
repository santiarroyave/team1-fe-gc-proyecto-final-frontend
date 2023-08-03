import { Component, ElementRef, ViewChild } from '@angular/core';

declare var bootstrap: any;

@Component({
  selector: 'app-oferta-detalle',
  templateUrl: './oferta-detalle.component.html',
  styleUrls: ['./oferta-detalle.component.css']
})
export class OfertaDetalleComponent {
  @ViewChild('liveToast', { static: true })
  toastLiveExampleRef!: ElementRef<HTMLElement>;

  toastTrigger(): void {
    const toastLiveExample = document.getElementById('liveToast');

    const toastBootstrap = new bootstrap.Toast(toastLiveExample);
    toastBootstrap.show();
  }
}
