import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AboutComponent } from './components/about/about.component';
import { OfertaDetalleComponent } from './components/oferta-detalle/oferta-detalle.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { FavoritosComponent } from './components/favoritos/favoritos.component';
import { ReservasComponent } from './components/reservas/reservas.component';
import { CrearOfertaComponent } from './components/admin/crear-oferta/crear-oferta.component';
import { HotelesComponent } from './components/admin/hoteles/hoteles.component';
import { CrearHotelComponent } from './components/admin/hoteles/crear-hotel/crear-hotel.component';
import { ActividadesComponent } from './components/admin/actividades/actividades.component';
import { CrearActividadComponent } from './components/admin/actividades/crear-actividad/crear-actividad.component';
import { EditarActividadComponent } from './components/admin/actividades/editar-actividad/editar-actividad.component';
import { EditarHotelComponent } from './components/admin/hoteles/editar-hotel/editar-hotel.component';


const routes: Routes = [
  {path:"login", component: LoginComponent},
  {path:"register", component: RegisterComponent},
  {path:"home", component: HomeComponent},
  {path:"about", component: AboutComponent},
  {path:"oferta/:id", component: OfertaDetalleComponent},
  {path:"favoritos", component: FavoritosComponent},
  {path:"favoritos/:id", component: OfertaDetalleComponent},
  {path:"reservas", component: ReservasComponent},
  {path:"reservas/:id", component: OfertaDetalleComponent},
  {path:"checkout", component:CheckoutComponent},
  {path:"", redirectTo:"/home", pathMatch:"full"},
  // ADMIN
  {path:"admin/crear-oferta", component: CrearOfertaComponent},
  {path:"admin/hoteles", component: HotelesComponent},
  {path:"admin/crear-hotel", component: CrearHotelComponent},
  {path:"admin/editar-hotel/:id", component: EditarHotelComponent},
  {path:"admin/actividades", component: ActividadesComponent},
  {path:"admin/crear-actividad", component: CrearActividadComponent},
  {path:"admin/editar-actividad/:id", component: EditarActividadComponent},
  //Not Found
  {path:"**", component: PageNotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
