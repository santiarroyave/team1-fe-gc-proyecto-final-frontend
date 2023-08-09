import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { OfertasService } from 'src/app/services/ofertas.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent {
  num_personas: number = 2;
  nombre: string = '';
  @Output() nombre_oferta = new EventEmitter();

  today: Date = new Date();
  month: number = this.today.getMonth();
  year: number = this.today.getFullYear();
  ts_max: number | any;
  max: Date | any;
  min: Date = new Date(this.today);
  campaignOne: FormGroup | any;
  constructor(private route: ActivatedRoute, private ofertasService: OfertasService){}

  ngOnInit(): void {
    this.ts_max = this.today.setMonth(this.today.getMonth() + 2);
    //this.ts_max = this.today.setDate(0);
    this.max = new Date(this.ts_max);
    
    this.campaignOne = new FormGroup({
      start: new FormControl(
        new Date(this.year, this.month, this.today.getDate())
      ),
      end: new FormControl(new Date(this.year, this.month, this.today.getDate())),
    });
  }

  sendEvent(event: any):void{
    this.nombre_oferta.emit(event);
  }
  
}
