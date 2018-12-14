import { Routes, RouterModule } from '@angular/router';
import { RobaComponent } from './roba/roba.component';
import { NgModule } from '@angular/core';
import { FilteriComponent } from './roba/filteri/filteri.component';
import { AkumulatoriComponent } from './roba/akumulatori/akumulatori.component';
import { UljaComponent } from './roba/ulja/ulja.component';
import { DasboardComponent } from './dasboard/dasboard.component';
import { KorpaComponent } from './korpa/korpa.component';
import { LoginComponent } from './login/login.component';
import { FakturaComponent } from './faktura/faktura.component';
import { FakturaDetaljiComponent } from './faktura/faktura-detalji/faktura-detalji.component';

const routes: Routes = [
  {path: '', redirectTo: '/naslovna', pathMatch: 'full' },
  {path: 'naslovna' , component: DasboardComponent},
  {path: 'o-nama' , component: DasboardComponent},
  {path: 'kontakt' , component: DasboardComponent},
  {path: 'roba' , component: RobaComponent},
  {path: 'filteri' , component: FilteriComponent},
  {path: 'ulja' , component: UljaComponent},
  {path: 'akumulatori' , component: AkumulatoriComponent},
  {path: 'login' , component: LoginComponent},
  {path: 'porudzbenice', component: FakturaComponent},
  {path: 'porudzbenice/:id', component: FakturaDetaljiComponent},
  {path: 'korpa', component: KorpaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
