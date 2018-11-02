import { Routes, RouterModule } from '@angular/router';
import { RobaComponent } from './roba/roba.component';
import { NgModule } from '@angular/core';
import { FilteriComponent } from './roba/filteri/filteri.component';
import { AkumulatoriComponent } from './roba/akumulatori/akumulatori.component';
import { UljaComponent } from './roba/ulja/ulja.component';
import { DasboardComponent } from './dasboard/dasboard.component';
import { MotornaComponent } from './roba/ulja/motorna/motorna.component';
import { KorpaComponent } from './korpa/korpa.component';

const routes: Routes = [
  {path: '', redirectTo: '/naslovna', pathMatch: 'full' },
  {path: 'naslovna' , component: DasboardComponent},
  {path: 'roba' , component: RobaComponent},
  {path: 'filteri' , component: FilteriComponent},
  {path: 'ulja' , component: UljaComponent},
  {path: 'akumulatori' , component: AkumulatoriComponent},
  {path: 'korpa', component: KorpaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
