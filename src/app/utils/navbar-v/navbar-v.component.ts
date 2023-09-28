import { Component } from '@angular/core';
import { OfertaFiltros } from 'src/app/models/OfertaFiltros';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-navbar-v',
  templateUrl: './navbar-v.component.html',
  styleUrls: ['./navbar-v.component.css'],
})
export class NavbarVComponent {
  // ATRIBUTOS
  ofertas: any[] = [];

  precioMinimo: number = 0;
  precioMaximo: number = 5000;
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

  constructor(private homeService: HomeService) {}

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

    this.ofertas = this.homeService.getAllOfertasParaFiltrar();
    console.log("Dentro de los filtros:", this.ofertas);

    let ofertas_first_filter: OfertaFiltros[] = [];
    let ofertas_second_filter: OfertaFiltros[] = [];
    let ofertas_third_filter: OfertaFiltros[] = [];

    // Primer filtro por categoría
    let existeFiltroCategoria = false;
    if (this.filter_cat.length > 0) existeFiltroCategoria = true;

    if (existeFiltroCategoria) {
      for (const oferta of this.ofertas) {
        if (this.filter_cat.includes(oferta.categoriaAlojamiento)) {
          ofertas_first_filter.push(oferta);
        }
      }
    } else {
      ofertas_first_filter = this.ofertas;
    }

    // Segundo filtro por precio
    for (const oferta of ofertas_first_filter) {
      if (
        oferta.oferta.precio <= Number(this.precioMaximo) &&
        oferta.oferta.precio >= Number(this.precioMinimo)
      ) {
        ofertas_second_filter.push(oferta);
      }
    }

    // Tercer filtro por servicios de alojamiento
    const serviciosSeleccionados = this.listaServicios
      .filter(servicio => servicio.check)
      .map(servicio => servicio.id);

    if (serviciosSeleccionados.length > 0) {
      for (const oferta of ofertas_second_filter) {
        const serviciosOferta = oferta.serviciosAlojamiento.map(servicio => servicio['id']);

        // Comprueba si todos los servicios seleccionados están presentes en la oferta
        const todosLosServiciosCoinciden = serviciosSeleccionados.every(id =>
          serviciosOferta.includes(id)
        );

        if (todosLosServiciosCoinciden) {
          ofertas_third_filter.push(oferta);
        }
      }
    } else {
      ofertas_third_filter = ofertas_second_filter;
    }

    // Ahora ofertas_third_filter contiene todas las ofertas que pasaron los tres filtros.
    console.log("Ofertas filtradas:", ofertas_third_filter);
    this.homeService.actualizarOfertasFiltradas(ofertas_third_filter);
  }
}
