import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrls: ['./paso-uno.component.css']
})
export class PasoUnoComponent implements OnInit{
  precio = 100;
  today = new Date();
  month = this.today.getMonth();
  year = this.today.getFullYear();
  ts_max: number | any;
  max: Date | any;
  min = new Date(this.today);

  campaignOne = new FormGroup({
    start: new FormControl(new Date(this.year, this.month, this.today.getDate())),
    end: new FormControl(new Date(this.year, this.month, this.today.getDate())),
  });

  ngOnInit():void{
    this.ts_max = this.today.setMonth(this.today.getMonth()+2);
    this.ts_max = this.today.setDate(0);
    this.max = new Date(this.ts_max);
  }
}
