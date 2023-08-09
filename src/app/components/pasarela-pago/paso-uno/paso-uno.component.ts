import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OfertasService } from 'src/app/services/ofertas.service';

declare var bootstrap: any;

@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrls: ['./paso-uno.component.css'],
})
export class PasoUnoComponent implements OnInit {
  @ViewChild('liveToast', { static: true })
  toastLiveExampleRef!: ElementRef<HTMLElement>;

  num_personas: number = 2;
  oferta: any = {};

  precio_noche: number | any;
  precio_persona: number | any;
  today: Date = new Date();
  month: number = this.today.getMonth();
  year: number = this.today.getFullYear();
  ts_max: number | any;
  max: Date | any;
  min: Date = new Date(this.today);
  noches:number = 1;
  campaignOne: FormGroup | any;

  constructor(private route: ActivatedRoute, private ofertasService: OfertasService, private router: Router){}

  ngOnInit(): void {
    this.ts_max = this.today.setMonth(this.today.getMonth() + 2);
    //this.ts_max = this.today.setDate(0);
    this.max = new Date(this.ts_max);

    this.route.params.subscribe((params) => {
      const elementId: number = Number(params['id']);
      this.oferta = this.ofertasService.getOfertaById(elementId);
    });
    this.precio_noche = this.oferta.precio;
    this.precio_persona = this.precio_noche/this.num_personas;
    let date1 = new Date();
    let date2 = date1.setDate(date1.getDate() + this.noches);
    date1 = new Date(date2);
    
    this.campaignOne = new FormGroup({
      start: new FormControl(
        new Date(this.year, this.month, this.today.getDate())
      ),
      end: new FormControl(new Date(this.year, this.month, date1.getDate())),
    });
  }

  toastTrigger(): void {
    const toastLiveExample = document.getElementById('liveToast');
    const toastBootstrap = new bootstrap.Toast(toastLiveExample);
    toastBootstrap.show();
  }

  calcularNoches():void {
    this.noches = Number(this.campaignOne.value.end?.getDate()) - Number(this.campaignOne.value.start?.getDate());
    this.precio_persona = (this.precio_noche*this.noches)/this.num_personas;
  }

  actualizarOferta():void {
    this.ofertasService.oferta = this.precio_noche*this.noches;
    this.router.navigate([`/paso-2/${this.oferta.id}`]);
  }
}
