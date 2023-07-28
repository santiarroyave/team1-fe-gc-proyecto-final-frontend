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
    ReservasComponent
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
