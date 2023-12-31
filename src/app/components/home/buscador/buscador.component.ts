import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { OfertaFiltros } from 'src/app/models/OfertaFiltros';
import { HomeService } from 'src/app/services/home.service';
import { OfertasService } from 'src/app/services/ofertas.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent {
  num_personas: number = 2;
  ubicacion: string = '';
  
  lista_ofertas: OfertaFiltros[] = [];

  today: Date = new Date();
  month: number = this.today.getMonth();
  year: number = this.today.getFullYear();
  ts_max: number | any;
  min: Date = new Date(this.today);
  campaignOne: FormGroup | any;

  constructor(private homeService: HomeService, private ofertasService: OfertasService){}

  ngOnInit(): void {
    this.campaignOne = new FormGroup({
      start: new FormControl(
        new Date(this.year, this.month, this.today.getDate())
      ),
      end: new FormControl(new Date(this.year, this.month, this.today.getDate())),
    });
    
  }

  increasePersonCount() {
    
    if (this.num_personas < 18) {
      this.num_personas++;
    }
  }

  decreasePersonCount() {
    
    if (this.num_personas > 1) {
      this.num_personas--;
    }
  }

  buscar(): void {
    let fechas = this.formatearFechas(this.campaignOne.value.start, this.campaignOne.value.end);
    this.homeService.getBuscarOfertas(this.ubicacion, fechas[0], fechas[1], this.num_personas).subscribe(response => {
      this.lista_ofertas = response;
      console.log("Ofertas filtradas por el buscador:", response);
      this.homeService.actualizarOfertasFiltradas(response);
      this.homeService.setOfertasAllParaFiltrar(response);
    });
  }

  formatearFechas(fecha_ini:string,fecha_fin:string): string[] {
    const fecha_inicio = new Date(fecha_ini);
    let año = fecha_inicio.getFullYear();
    // El mes se devuelve en base 0, por lo que sumamos 1 para obtener el mes real
    let mes = (fecha_inicio.getMonth() + 1).toString().padStart(2, '0');
    let dia = fecha_inicio.getDate().toString().padStart(2, '0');
    const fecha_inicio_formateada = `${año}-${mes}-${dia}`;

    let fecha_fin_formateada = '';
    if(fecha_fin != null){
      const fecha_fi = new Date(fecha_fin);
      año = fecha_fi.getFullYear();
      // El mes se devuelve en base 0, por lo que sumamos 1 para obtener el mes real
      mes = (fecha_fi.getMonth() + 1).toString().padStart(2, '0');
      dia = fecha_fi.getDate().toString().padStart(2, '0');
      fecha_fin_formateada = `${año}-${mes}-${dia}`;
    }

    return [fecha_inicio_formateada,fecha_fin_formateada];
  }
  
}
