import { Component, OnInit } from '@angular/core';
import { OfertasService } from 'src/app/services/ofertas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  ofertas: any = [];

  constructor(private ofertasService: OfertasService) {}

  ngOnInit(): void {
      this.ofertas = this.ofertasService.getAllOfertas();
  }

}
