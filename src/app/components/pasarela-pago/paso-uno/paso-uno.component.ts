import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OfertaCompleta } from 'src/app/models/OfertaCompleta';
import { OfertasService } from 'src/app/services/ofertas.service';

@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrls: ['./paso-uno.component.css'],
})
export class PasoUnoComponent implements OnInit {
  @ViewChild('liveToast', { static: true })
  toastLiveExampleRef!: ElementRef<HTMLElement>;

  num_personas: number = 2;
  ofertaCompleta!: OfertaCompleta;

  precio_noche: number | any;
  precio_persona: number | any;
  today: Date = new Date();
  month: number = this.today.getMonth();
  year: number = this.today.getFullYear();
  ts_max: number | any;
  max!: Date;
  min!: Date;
  noches: number = 1;
  campaignOne: FormGroup | any;

  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const elementId: number = Number(params['id']);
      this.ofertasService.getOfertaById(elementId).subscribe((res) => {
        console.log(res);
        
        this.ofertaCompleta = res;
        this.precio_noche = this.ofertaCompleta.oferta.precio;
        this.precio_persona = this.precio_noche / this.num_personas;
        this.max = new Date(this.ofertaCompleta.oferta.fechaFin);
        let fechaInicio = new Date(this.ofertaCompleta.oferta.fechaInicio);        
        if(fechaInicio < this.today) this.min = this.today;
        else this.min = new Date(this.ofertaCompleta.oferta.fechaInicio);
      });
    });
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

  calcularNoches(): void {
    const difMilisegundos =
      this.campaignOne.value.end.getTime() -
      this.campaignOne.value.start.getTime();
    this.noches = difMilisegundos / (24 * 60 * 60 * 1000);
    console.log(this.noches);
    this.precio_persona = (this.precio_noche * this.noches) / this.num_personas;
  }

  increasePersonCount() {
    if (this.num_personas < this.ofertaCompleta.oferta.maxPersonas) {
      this.num_personas++;
      this.calcularNoches();
    }
  }

  decreasePersonCount() {
    if (this.num_personas > 1) {
      this.num_personas--;
      this.calcularNoches();
    }
  }

  pasoDos(): void {
    const startDate = new Date(this.campaignOne.value.start)
    const sdDay = String(startDate.getDate()).padStart(2, '0');
    const sdMonth = String(startDate.getMonth() + 1).padStart(2, '0'); // El mes comienza en 0, así que le sumamos 1;
    const sdYear = startDate.getFullYear();
    const start = `${sdYear}-${sdMonth}-${sdDay}`;
    const endDate = new Date(this.campaignOne.value.end)
    const endDay = String(endDate.getDate()).padStart(2, '0');
    const endMonth = String(endDate.getMonth() + 1).padStart(2, '0'); // El mes comienza en 0, así que le sumamos 1;
    const endYear = endDate.getFullYear();
    const end = `${endYear}-${endMonth}-${endDay}`;
    
    this.router.navigate([`/paso-2/${this.ofertaCompleta.oferta.id}`], {
      queryParams: {
        fechaInicio: start,
        fechaFin: end,
        estado: 'Activa',
        precio: (this.noches*this.precio_noche).toString()
      },
    });
  }
}
