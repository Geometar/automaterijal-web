import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../service/data.service';
import { Korpa, RobaKorpa } from '../model/porudzbenica';
import { LocalStorageService } from '../service/local-storage.service';
import { MatTable, MatDialog } from '@angular/material';
import { Roba } from '../model/roba';
import { IzmenaKolicineModalComponent } from './izmena-kolicine-modal/izmena-kolicine-modal.component';
import { of } from 'rxjs';

@Component({
  selector: 'app-korpa',
  templateUrl: './korpa.component.html',
  styleUrls: ['./korpa.component.css']
})
export class KorpaComponent implements OnInit {

  public korpa: Korpa;
  public dataSource: any;
  public displayedColumns: string[] = ['katbr', 'katbrpro', 'naziv'
    , 'proizvodjac', 'kolicina', 'cena', 'izbaciDugme'];
  @ViewChild(MatTable) table: MatTable<any>;
  constructor(private dataService: DataService,
    public storage: LocalStorageService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.dataService.trenutnaKorpa.subscribe(korpa => {
      this.korpa = korpa;
      this.dataSource = this.korpa.roba;
    });
  }

  izbaciIzKorpe(index: number) {
    this.dataService.izbaciIzKorpe(index);
    this.table.renderRows();
  }

  otvoriDialog(roba: RobaKorpa): void {
    const dialogRef = this.dialog.open(IzmenaKolicineModalComponent, {
      width: '30%',
      data: roba
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.promeniKolicinuArtikla(result);
      }
    });
  }

  promeniKolicinuArtikla(artikal: RobaKorpa) {
    this.korpa.roba.forEach(roba => {
      if (roba.katbr === artikal.katbr) {
        roba.kolicina = artikal.kolicina;
        roba.cenaUkupno = artikal.cenaUkupno;
      }
    });
    this.storage.zameniArtikalSaNovim(artikal);
    this.dataSource = this.korpa.roba;
    this.table.renderRows();
  }

}
