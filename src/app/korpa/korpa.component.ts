import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../service/data.service';
import { Korpa, RobaKorpa } from '../model/porudzbenica';
import { LocalStorageService } from '../service/local-storage.service';
import { MatTable, MatDialog } from '@angular/material';
import { IzmenaKolicineModalComponent } from './izmena-kolicine-modal/izmena-kolicine-modal.component';

@Component({
  selector: 'app-korpa',
  templateUrl: './korpa.component.html',
  styleUrls: ['./korpa.component.scss']
})
export class KorpaComponent implements OnInit {

  public korpa: Korpa;
  public bezPdv: string;
  public pdv: string;
  public ukupno: string;
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
      this.preracunajUkupno();
      this.dataSource = this.korpa.roba;
    });
  }

  izbaciIzKorpe(index: number) {
    this.dataService.izbaciIzKorpe(index);
    this.table.renderRows();
  }

  otvoriDialog(roba: RobaKorpa): void {
    const dialogRef = this.dialog.open(IzmenaKolicineModalComponent, {
      width: '400px',
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
    this.preracunajUkupno();
    this.dataSource = this.korpa.roba;
    this.table.renderRows();
  }

  private preracunajUkupno() {
    this.korpa.ukupno = 0;
    this.korpa.roba.forEach(roba => {
      this.korpa.ukupno =  this.korpa.ukupno + roba.cenaUkupno;
    });
    this.bezPdv = (this.korpa.ukupno / 1.2).toFixed(2);
    this.pdv = (this.korpa.ukupno - this.korpa.ukupno / 1.2).toFixed(2);
    this.ukupno =  this.korpa.ukupno.toFixed(2);
  }

}
