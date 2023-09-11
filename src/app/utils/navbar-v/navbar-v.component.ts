import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FiltrosResponse } from 'src/app/models/FiltrosResponse';
import { Oferta } from 'src/app/models/Oferta';

@Component({
  selector: 'app-navbar-v',
  templateUrl: './navbar-v.component.html',
  styleUrls: ['./navbar-v.component.css'],
})
export class NavbarVComponent implements OnInit {
  // ATRIBUTOS
  @Input() data_filtros: FiltrosResponse | any;
  @Output() ofertas = new EventEmitter();
  @Output() res_busqueda = new EventEmitter();

  precioMinimo: number = 200;
  precioMaximo: number = 2000;
  // Servicios de ejemplo (hace llamada a la BBDD)
  listaServicios = [
    {
      id: 1,
      nombre: 'Wifi',
      check: false,
    },
    {
      id: 2,
      nombre: 'Lavadora',
      check: false,
    },
    {
      id: 3,
      nombre: 'Aire acondicionado',
      check: false,
    },
    {
      id: 4,
      nombre: 'Cocina',
      check: false,
    },
    {
      id: 5,
      nombre: 'Secadora',
      check: false,
    },
    {
      id: 6,
      nombre: 'Calefacción',
      check: false,
    },
    {
      id: 7,
      nombre: 'Zona para trabajar',
      check: false,
    },
    {
      id: 8,
      nombre: 'Televisión',
      check: false,
    },
    {
      id: 9,
      nombre: 'Piscina',
      check: false,
    },
    {
      id: 10,
      nombre: 'Desayuno',
      check: false,
    },
    {
      id: 11,
      nombre: 'Gimnasio',
      check: false,
    },
  ];
  categorias_alojamiento: boolean[] = [
    false,
    false,
    false,
    false,
    false,
    false,
  ];
  filter_cat: number[] = [];

  constructor() {}

  ngOnInit(): void {
    console.log(this.data_filtros);
  }

  actualizarFiltroAlojamiento(indice: number) {
    this.categorias_alojamiento[indice] = !this.categorias_alojamiento[indice];
    if (this.categorias_alojamiento[indice]) this.filter_cat.push(indice);
    else {
      if (this.filter_cat.includes(indice))
        this.filter_cat = this.filter_cat.filter((index) => index !== indice);
    }
    this.filtrar();
  }

  actualizarFiltroServicios(indice: number) {
    this.listaServicios[indice].check = !this.listaServicios[indice].check;
    this.filtrar();
  }

  filtrar(): void {
    let ofertas_first_filter = [];
    let ofertas_second_filter = [];
    let ofertas_third_filter: Oferta[] = [];

    //Primer filtro por categoria
    let existeFiltroCategoria = false;
    if (this.filter_cat.length > 0) existeFiltroCategoria = true;

    if (existeFiltroCategoria) {
      for (const oferta of this.data_filtros.ofertas) {
        const id_alojamiento = oferta.idAlojamiento;
        let alojamiento = undefined;
        for (let i = 0; i < this.data_filtros.alojamientos.length; i++) {
          if (id_alojamiento === this.data_filtros.alojamientos[i].id) {
            alojamiento = this.data_filtros.alojamientos[i];
            for (let j = 0; j < this.filter_cat.length; j++) {
              if (alojamiento.categoria === this.filter_cat[j]) {
                ofertas_first_filter.push(oferta);
              }
            }
          }
        }
      }
    } else {
      ofertas_first_filter = this.data_filtros.ofertas;
    }

    //Segundo filtro por precio
    for (const oferta of ofertas_first_filter) {
      if (
        oferta.precio <= Number(this.precioMaximo) &&
        oferta.precio >= Number(this.precioMinimo)
      ) {
        ofertas_second_filter.push(oferta);
      }
    }

    //Tercer filtro por servicios de alojamiento
    let servicioIsChecked = false;

    for (const ser of this.listaServicios) {
      if (ser.check) servicioIsChecked = true;
    }
    
    if (servicioIsChecked) {
      for (const oferta of ofertas_second_filter) {
        const id_alojamiento = oferta.idAlojamiento;
        for (
          let i = 0;
          i < this.data_filtros.s_A.length;
          i++
        ) {
          const s_a = this.data_filtros.s_A[i];
          for (let j = 0; j < this.listaServicios.length; j++) {
            if (
              s_a.idAlojamiento == id_alojamiento &&
              s_a.idServicio == this.listaServicios[j].id && this.listaServicios[j].check
            ) {
              if (!ofertas_third_filter.includes(oferta)) {
                ofertas_third_filter.push(oferta);
              }
            }
          }
        }
      }
    } else {
      ofertas_third_filter = ofertas_second_filter;
    }
    this.ofertas.emit(ofertas_third_filter);
    this.res_busqueda.emit(ofertas_third_filter.length);
  }
}
