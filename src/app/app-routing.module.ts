import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AboutComponent } from './components/about/about.component';
import { OfertaDetalleComponent } from './components/oferta-detalle/oferta-detalle.component';
import { FavoritosComponent } from './components/favoritos/favoritos.component';
import { ReservasComponent } from './components/reservas/reservas.component';
import { CrearOfertaComponent } from './components/admin/crear-oferta/crear-oferta.component';
import { HotelesComponent } from './components/admin/hoteles/hoteles.component';
import { CrearHotelComponent } from './components/admin/hoteles/crear-hotel/crear-hotel.component';
import { ActividadesComponent } from './components/admin/actividades/actividades.component';
import { CrearActividadComponent } from './components/admin/actividades/crear-actividad/crear-actividad.component';
import { EditarActividadComponent } from './components/admin/actividades/editar-actividad/editar-actividad.component';
import { EditarHotelComponent } from './components/admin/hoteles/editar-hotel/editar-hotel.component';
import { PasoUnoComponent } from './components/pasarela-pago/paso-uno/paso-uno.component';
import { PasoDosComponent } from './components/pasarela-pago/paso-dos/paso-dos.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { RecompensasComponent } from './components/recompensas/recompensas.component';
import { ReservaDetalleComponent } from './components/reservas/reserva-detalle/reserva-detalle.component';
import { authAdminGuard, authUserGuard } from './guards/auth.guard';


const routes: Routes = [
  {path:"login", component: LoginComponent},
  {path:"register", component: RegisterComponent},
  {path:"home", component: HomeComponent},
  {path:"about", component: AboutComponent},
  {path:"perfil", component: PerfilComponent, canActivate: [authUserGuard]},
  {path:"oferta/:id", component: OfertaDetalleComponent},
  {path:"favoritos", component: FavoritosComponent, canActivate: [authUserGuard]},
  {path:"favoritos/:id", component: OfertaDetalleComponent, canActivate: [authUserGuard]},
  {path:"reservas", component: ReservasComponent, canActivate: [authUserGuard]},
  {path:"recompensas", component: RecompensasComponent, canActivate: [authUserGuard]},
  {path:"reservas/:id", component: ReservaDetalleComponent, canActivate: [authUserGuard]},
  {path:"paso-1/:id", component:PasoUnoComponent},
  {path:"paso-2/:id", component:PasoDosComponent},
  {path:"", redirectTo:"/home", pathMatch:"full"},
  // ADMIN
  {path:"admin/crear-oferta", component: CrearOfertaComponent, canActivate: [authAdminGuard]},
  {path:"admin/hoteles", component: HotelesComponent, canActivate: [authAdminGuard]},
  {path:"admin/crear-hotel", component: CrearHotelComponent, canActivate: [authAdminGuard]},
  {path:"admin/editar-hotel/:id", component: EditarHotelComponent, canActivate: [authAdminGuard]},
  {path:"admin/actividades", component: ActividadesComponent, canActivate: [authAdminGuard]},
  {path:"admin/crear-actividad", component: CrearActividadComponent, canActivate: [authAdminGuard]},
  {path:"admin/editar-actividad/:id", component: EditarActividadComponent, canActivate: [authAdminGuard]},
  //Not Found
  {path:"**", component: PageNotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
