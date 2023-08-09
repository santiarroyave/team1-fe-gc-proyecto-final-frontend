import { NgModule,LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCardModule} from '@angular/material/card';
import {MatNativeDateModule,MAT_DATE_FORMATS} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import { MAT_DATE_LOCALE } from '@angular/material/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { PasoUnoComponent } from './components/pasarela-pago/paso-uno/paso-uno.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PasoDosComponent } from './components/pasarela-pago/paso-dos/paso-dos.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HotelItemComponent } from './components/admin/hoteles/hotel-item/hotel-item.component';
import { ActividadItemComponent } from './components/admin/actividades/actividad-item/actividad-item.component';
import { EditarCampoComponent } from './utils/editar-campo/editar-campo.component';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

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
    ActividadesListaComponent,
    PasoUnoComponent,
    PasoDosComponent,
    LoginComponent,
    RegisterComponent,
    HotelItemComponent,
    ActividadItemComponent,
    EditarCampoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatCardModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatButtonModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
