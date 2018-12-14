import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StorageServiceModule } from 'angular-webstorage-service';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material/material.module';
import { NavigacijaComponent } from './navigacija/navigacija.component';
import { RobaComponent } from './roba/roba.component';
import { DasboardComponent } from './dasboard/dasboard.component';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilteriComponent } from './roba/filteri/filteri.component';
import { AkumulatoriComponent } from './roba/akumulatori/akumulatori.component';
import { UljaComponent } from './roba/ulja/ulja.component';
import { MotornaComponent } from './roba/ulja/motorna/motorna.component';
import { MenjackoComponent } from './roba/ulja/menjacko/menjacko.component';
import { KocionaComponent } from './roba/ulja/kociona/kociona.component';
import { AntifrizComponent } from './roba/ulja/antifriz/antifriz.component';
import { IndustrijskaComponent } from './roba/ulja/industrijska/industrijska.component';
import { KorpaComponent } from './korpa/korpa.component';
import { IzmenaKolicineModalComponent } from './korpa/izmena-kolicine-modal/izmena-kolicine-modal.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { LogoutModalComponent } from './navigacija/logout-modal/logout-modal.component';
import { FakturaComponent } from './faktura/faktura.component';
import { TranslatePipe } from './pipes/PrevodilacPipe';
import { EmptyPipe } from './pipes/EmptyPipe';
import { FakturaDetaljiComponent } from './faktura/faktura-detalji/faktura-detalji.component';
import { DatePipe } from './pipes/DatePipe';

@NgModule({
  declarations: [
    AppComponent,
    NavigacijaComponent,
    RobaComponent,
    DasboardComponent,
    FilteriComponent,
    AkumulatoriComponent,
    UljaComponent,
    MotornaComponent,
    MenjackoComponent,
    KocionaComponent,
    AntifrizComponent,
    IndustrijskaComponent,
    KorpaComponent,
    IzmenaKolicineModalComponent,
    LoginComponent,
    LogoutModalComponent,
    FakturaComponent,
    TranslatePipe,
    EmptyPipe,
    DatePipe,
    FakturaDetaljiComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
    StorageServiceModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [IzmenaKolicineModalComponent, LogoutModalComponent]
})
export class AppModule { }
