import { Component, OnInit } from '@angular/core';
import { Roba } from 'src/app/model/roba';
import { Proizvodjac } from 'src/app/model/proizvodjac';
import { RobaService } from 'src/app/service/roba.service';
import { ProizvodjacService } from 'src/app/service/proizvodjac.service';
import { Sort, MatSnackBar } from '@angular/material';
import { takeWhile } from 'rxjs/operators';
import { AppUtilsService } from 'src/app/utils/app-utils.service';
import { DataService } from 'src/app/service/data.service';
import { Korpa } from 'src/app/model/porudzbenica';

@Component({
  selector: 'app-kociona',
  templateUrl: './kociona.component.html',
  styleUrls: ['./kociona.component.css']
})
export class KocionaComponent implements OnInit {

  public roba: Roba[];
  public proizvodjaci: Proizvodjac[];

  // Paging and Sorting elements
  public rowsPerPage = 10;
  public pageIndex = 0;
  public sort = null;
  public tableLength;

  // Filteri
  public izabraniProizvodjac = '';
  public raspolozivost: string[] = ['Svi artikli', 'Ima na stanju'];
  public izabranaRaspolozivost: string = this.raspolozivost[1];

  public searchValue = '';
  public lastSearchValue = '';
  public pocetnoPretrazivanje: boolean;
  public ucitavanje = false;
  public otvoriFilterDiv = false;
  public displayedColumns: string[] = ['katbr', 'katbrpro', 'naziv'
    , 'proizvodjac', 'cena', 'stanje', 'kolicina', 'korpa', 'u-korpi'];
  public dataSource: any;

  private alive = true;
  private korpa: Korpa;

  private vrstaUlja = 'kociona';

  constructor(
    private robaService: RobaService,
    private utilsService: AppUtilsService,
     private proizvodjacService: ProizvodjacService,
     private dataService: DataService,
    public korpaSnackBar: MatSnackBar) { }

  ngOnInit() {
    this.pocetnoPretrazivanje = true;
    this.dataService.trenutnaKorpa.subscribe(korpa => this.korpa = korpa);
    this.pronadjiSveProizvodjace();
  }

  pronandjiSvaKocionaUlja() {
    this.ucitavanje = true;
    this.dataSource = null;

    this.robaService.pronadjiUlje(this.sort, this.rowsPerPage, this.pageIndex, null, null, null, this.vrstaUlja)
      .pipe(takeWhile(() => this.alive))
      .subscribe(
        res => {
          this.roba = res.content;
          this.dataSource = this.roba;
          this.dataSource = this.roba;
          this.rowsPerPage = res.size;
          this.pageIndex = res.number;
          this.tableLength = res.totalElements;
        },
        error => {
          this.roba = null;
          console.log('Podnaci robu izbacilo je gresko');
        });
  }

  pronadjiEntitetePoPretrazi(searchValue) {
    this.pocetnoPretrazivanje = false;
    this.lastSearchValue = searchValue;
    this.ucitavanje = true;
    this.dataSource = null;
    const naStanju = this.utilsService.daLiRobaTrebaDaBudeNaStanju(this.raspolozivost, this.izabranaRaspolozivost);
    const proizvodjacId = this.utilsService.vratiIdProizvodjacaAkoPostoji(this.izabraniProizvodjac, this.proizvodjaci);
    this.robaService.pronadjiUlje(this.sort, this.rowsPerPage, this.pageIndex, searchValue, naStanju, proizvodjacId, this.vrstaUlja)
      .pipe(takeWhile(() => this.alive))
      .subscribe(
        res => {
          this.roba = res.content;
          this.dataSource = this.roba;
          this.rowsPerPage = res.size;
          this.pageIndex = res.number;
          this.tableLength = res.totalElements;
        },
        error => {
          this.roba = null;
          console.log('Podnaci robu izbacilo je gresko');
        });
  }

  pronadjiSveProizvodjace() {
    this.proizvodjacService.pronadjiSveProizvodjaceUljaPoVrsti(this.vrstaUlja)
      .pipe(takeWhile(() => this.alive))
      .subscribe(res => {
        this.proizvodjaci = res;
        this.izabraniProizvodjac = this.proizvodjaci[0].naziv;
        this.pronandjiSvaKocionaUlja();
      },
        error => {
          this.proizvodjaci = null;
          console.log('Pronaci svu robu je bacilo gresku', error);
        });
  }

  pronaciPoTrazenojReci(searchValue) {
    if (this.dataSource) {
      this.pageIndex = 0;
    }
    this.pronadjiEntitetePoPretrazi(searchValue);
  }

  paginatorEvent(pageEvent) {
    this.dataSource = [];
    this.rowsPerPage = pageEvent.pageSize;
    this.pageIndex = pageEvent.pageIndex;
    this.pronadjiEntitetePoPretrazi(this.searchValue);
  }

  sortData(sort: Sort) {
    this.sort = sort;
    this.pronadjiEntitetePoPretrazi(this.searchValue);
  }

  toogleFilterDiv() {
    this.otvoriFilterDiv = !this.otvoriFilterDiv;
  }

  resetujFilter() {
    if (this.dataSource) {
      this.pageIndex = 0;
    }
    this.izabranaRaspolozivost = this.raspolozivost[1];
    this.izabraniProizvodjac = this.proizvodjaci[0].naziv;
    this.filtriraj();
  }

  filtriraj() {
    if (this.dataSource) {
      this.pageIndex = 0;
    }
    let recZaPretragu: string;
    recZaPretragu = this.searchValue;
    this.pronadjiEntitetePoPretrazi(recZaPretragu);
  }

  dodajUKorpu(roba: Roba) {
    const snackBarPoruka = this.utilsService.dodajUKorpu(roba);
    this.openKorpaSnackBar(snackBarPoruka);
    this.utilsService.izbrisiRobuSaStanja(this.roba, roba);
  }

  openKorpaSnackBar(poruka: string) {
    this.korpaSnackBar.open(poruka, '', {
      duration: 2000,
    });
  }

  uKorpi(katBr: string): boolean {
    return this.utilsService.daLiJeRobaUKorpi(this.korpa, katBr);
  }
}
