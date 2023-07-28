import { NgModule } from '@angular/core';
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
  {path:"**", component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
