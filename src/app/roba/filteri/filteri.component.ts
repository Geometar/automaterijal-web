import { Component, OnInit } from '@angular/core';
import { Roba, Proizvodjac, Partner} from 'src/app/model/dto';
import { RobaService } from 'src/app/service/roba.service';
import { ProizvodjacService } from 'src/app/service/proizvodjac.service';
import { Sort, MatSnackBar } from '@angular/material';
import { takeWhile, finalize, catchError } from 'rxjs/operators';
import { throwError, EMPTY } from 'rxjs';
import { DataService } from 'src/app/service/data.service';
import { Korpa } from 'src/app/model/porudzbenica';
import { AppUtilsService } from 'src/app/utils/app-utils.service';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-filteri',
  templateUrl: './filteri.component.html',
  styleUrls: ['./filteri.component.css']
})
export class FilteriComponent implements OnInit {

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
  public pronadjenaRoba = true;
  public otvoriFilterDiv = false;

  // Tabela
  private columnDefinitions = [
    { def: 'katbr', ifNotAuth: true },
    { def: 'katbrpro', ifNotAuth: true },
    { def: 'proizvodjac', ifNotAuth: true },
    { def: 'naziv', ifNotAuth: true },
    { def: 'cena', ifNotAuth: true },
    { def: 'stanje', ifNotAuth: true },
    { def: 'kolicina', ifNotAuth: false },
    { def: 'korpa', ifNotAuth: false },
    { def: 'u-korpi', ifNotAuth: false },
  ];
  public dataSource: any;

  private alive = true;
  private korpa: Korpa;
  public partner: Partner;

  constructor(private robaService: RobaService,
    private proizvodjacService: ProizvodjacService,
    private loginServis: LoginService,
    private dataService: DataService,
    private utilsService: AppUtilsService,
    public korpaSnackBar: MatSnackBar) { }

  ngOnInit() {
    this.pocetnoPretrazivanje = true;
    this.dataService.trenutnaKorpa.subscribe(korpa => this.korpa = korpa);
    this.loginServis.ulogovaniPartner.subscribe(partner => this.partner = partner);
    this.pronadjiSveProizvodjace();
  }

  getDisplayedColumns(): string[] {
    const isPartner = this.partner.ppid != null;
    const dataColumns = this.columnDefinitions
      .filter(cd => isPartner || cd.ifNotAuth)
      .map(cd => cd.def);
    return dataColumns;
  }

  pronandjiSveFiltere() {
    this.ucitavanje = true;
    this.pronadjenaRoba = true;
    this.robaService.pronadjiFiltere(this.sort, this.rowsPerPage, this.pageIndex, null, null, null)
      .pipe(
        takeWhile(() => this.alive),
        catchError((error: Response) => {
          if (error.status === 404) {
            this.pronadjenaRoba = false;
            return EMPTY;
          }
          return throwError(error);
        }),
        finalize(() => this.ucitavanje = false)
      )
      .subscribe(
        res => {
          this.pronadjenaRoba = true;
          this.roba = res.content;
          this.dataService.skiniSaStanjaUkolikoJeUKorpi(this.roba);
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

  pronadjiFilterePoPretrazi(searchValue) {
    this.pocetnoPretrazivanje = false;
    this.lastSearchValue = searchValue;
    this.ucitavanje = true;
    this.dataSource = null;
    const naStanju = this.utilsService.daLiRobaTrebaDaBudeNaStanju(this.raspolozivost, this.izabranaRaspolozivost);
    const proizvodjacId = this.utilsService.vratiIdProizvodjacaAkoPostoji(this.izabraniProizvodjac, this.proizvodjaci);
    this.ucitavanje = true;
    this.pronadjenaRoba = true;
    this.robaService.pronadjiFiltere(this.sort, this.rowsPerPage, this.pageIndex, searchValue, naStanju, proizvodjacId)
      .pipe(
        takeWhile(() => this.alive),
        catchError((error: Response) => {
          if (error.status === 404) {
            this.pronadjenaRoba = false;
            return EMPTY;
          }
          return throwError(error);
        }),
        finalize(() => this.ucitavanje = false)
      )
      .subscribe(
        res => {
          this.pronadjenaRoba = true;
          this.roba = res.content;
          this.dataService.skiniSaStanjaUkolikoJeUKorpi(this.roba);
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
    this.proizvodjacService.pronadjiSveProizvodjaceFiltera()
      .pipe(takeWhile(() => this.alive))
      .subscribe(res => {
        this.proizvodjaci = res;
        this.izabraniProizvodjac = this.proizvodjaci[0].naziv;
        this.pronandjiSveFiltere();
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
    this.pronadjiFilterePoPretrazi(searchValue);

  }

  paginatorEvent(pageEvent) {
    this.dataSource = [];
    this.rowsPerPage = pageEvent.pageSize;
    this.pageIndex = pageEvent.pageIndex;
    this.pronadjiFilterePoPretrazi(this.searchValue);
  }

  sortData(sort: Sort) {
    this.sort = sort;
    this.pronadjiFilterePoPretrazi(this.searchValue);
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
    this.pronadjiFilterePoPretrazi(recZaPretragu);
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
