import { Routes, RouterModule } from "@angular/router";
import { RobaComponent } from "./roba/roba.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
  {path:'roba' , component: RobaComponent},
  {path:'korpa' , component: RobaComponent},
  {path:'profil' , component: RobaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }