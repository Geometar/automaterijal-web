import { Component, OnInit } from '@angular/core';
import { Roba } from 'src/app/model/roba';
import { Proizvodjac } from 'src/app/model/proizvodjac';
import { RobaService } from 'src/app/service/roba.service';
import { ProizvodjacService } from 'src/app/service/proizvodjac.service';
import { Sort } from '@angular/material';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-ulja',
  templateUrl: './ulja.component.html',
  styleUrls: ['./ulja.component.css']
})
export class UljaComponent {
  selectedTab = 0;
  changeTab(tabIndex: number) {
    this.selectedTab = tabIndex;
  }
}
