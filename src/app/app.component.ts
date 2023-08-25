import { Component, OnInit } from '@angular/core';
import { ActividadesService } from './services/actividades.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'team1-fe-gc-proyecto-final-frontend';

  constructor(private actividadesService: ActividadesService){

  }

  ngOnInit(): void {
      this.actividadesService.getAllActividades().subscribe( result => {
        console.log(result);
      });
  }
}
