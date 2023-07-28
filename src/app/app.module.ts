import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NavbarHComponent } from './utils/navbar-h/navbar-h.component';
import { NavbarVComponent } from './utils/navbar-v/navbar-v.component';
import { FooterComponent } from './utils/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/home/header/header.component';
import { BuscadorComponent } from './components/home/buscador/buscador.component';
import { OfertaComponent } from './utils/oferta/oferta.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AboutComponent } from './components/about/about.component';
import { OfertaDetalleComponent } from './components/oferta-detalle/oferta-detalle.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { FavoritosComponent } from './components/favoritos/favoritos.component';
import { ReservasComponent } from './components/reservas/reservas.component';
import { CrearOfertaComponent } from './components/admin/crear-oferta/crear-oferta.component';
import { HotelesComponent } from './components/admin/hoteles/hoteles.component';
import { ActividadesComponent } from './components/admin/actividades/actividades.component';
import { CrearHotelComponent } from './components/admin/hoteles/crear-hotel/crear-hotel.component';
import { CrearActividadComponent } from './components/admin/actividades/crear-actividad/crear-actividad.component';
import { EditarActividadComponent } from './components/admin/actividades/editar-actividad/editar-actividad.component';
import { EditarHotelComponent } from './components/admin/hoteles/editar-hotel/editar-hotel.component';
import { ActividadesListaComponent } from './utils/actividades-lista/actividades-lista.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarHComponent,
    NavbarVComponent,
    FooterComponent,
    HomeComponent,
    HeaderComponent,
    BuscadorComponent,
    OfertaComponent,
    PageNotFoundComponent,
    AboutComponent,
    OfertaDetalleComponent,
    CheckoutComponent,
    FavoritosComponent,
    ReservasComponent,
    CrearOfertaComponent,
    HotelesComponent,
    ActividadesComponent,
    CrearHotelComponent,
    CrearActividadComponent,
    EditarActividadComponent,
    EditarHotelComponent,
    ActividadesListaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
