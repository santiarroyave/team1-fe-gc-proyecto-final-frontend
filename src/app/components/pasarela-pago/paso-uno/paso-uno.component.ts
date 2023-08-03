import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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

  precio_inicial: number = 100;
  precio_persona: number = this.precio_inicial;
  today: Date = new Date();
  month: number = this.today.getMonth();
  year: number = this.today.getFullYear();
  ts_max: number | any;
  max: Date | any;
  min: Date = new Date(this.today);
  noches:number = 1;

  campaignOne = new FormGroup({
    start: new FormControl(
      new Date(this.year, this.month, this.today.getDate())
    ),
    end: new FormControl(new Date(this.year, this.month, this.today.getDate())),
  });

  ngOnInit(): void {
    this.ts_max = this.today.setMonth(this.today.getMonth() + 2);
    this.ts_max = this.today.setDate(0);
    this.max = new Date(this.ts_max);
  }

  toastTrigger(): void {
    const toastLiveExample = document.getElementById('liveToast');

    const toastBootstrap = new bootstrap.Toast(toastLiveExample);
    toastBootstrap.show();
  }

  calcularNoches():void {
    this.noches = Number(this.campaignOne.value.end?.getDate()) - Number(this.campaignOne.value.start?.getDate());
    this.precio_persona = this.precio_inicial*this.noches;
  }
}
