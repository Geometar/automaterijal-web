import { Component, OnInit } from '@angular/core';
import { RobaService } from '../service/roba.service';
import { Roba } from '../model/roba';
import { takeWhile } from 'rxjs/operators';
import { LoadingData } from '../model/loading';
import { Sort } from '@angular/material';
import { Proizvodjac } from '../model/proizvodjac';
import { ProizvodjacService } from '../service/proizvodjac.service';

@Component({
  selector: 'app-roba',
  templateUrl: './roba.component.html',
  styleUrls: ['./roba.component.css']
})
export class RobaComponent implements OnInit {

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
  public izabranaRaspolozivost: string = this.raspolozivost[0];

  public searchValue = '';
  public pocetnoPretrazivanje: boolean;
  public searchMinTriKarakteraPrekrseno = false;
  public ucitavanje = false;
  public otvoriFilterDiv = true;
  public displayedColumns: string[] = ['katbr', 'katbrpro', 'naziv'
    , 'proizvodjac', 'grupa', 'podGrupa', 'cena', 'stanje']
  public dataSource: any;

  private alive = true;

  constructor(private robaService: RobaService, private proizvodjacService: ProizvodjacService) { }

  ngOnInit() {
    this.pocetnoPretrazivanje = true;
    this.pronadjiSveProizvodjace();
  }

  pronadjiSvuRobu(searchValue) {
    this.pocetnoPretrazivanje = false;
    if (searchValue.length > 2) {
      this.searchMinTriKarakteraPrekrseno = false;
      this.ucitavanje= true;
      this.dataSource = null;
      this.robaService.pronadjiSvuRobu(this.sort, this.rowsPerPage, this.pageIndex, searchValue)
        .pipe(takeWhile(() => this.alive))
        .subscribe(
          res => {
            this.roba = res.content;
            if(this.searchMinTriKarakteraPrekrseno === true) {
              this.dataSource = []
            } else {
              this.dataSource = this.roba;
            }
            this.dataSource = this.roba;
            this.rowsPerPage = res.size;
            this.pageIndex = res.number;
            this.tableLength = res.totalElements;
          },
          error => {
            this.roba = null;
            console.log("Podnaci robu izbacilo je gresko")
          });
    } else {
      this.searchMinTriKarakteraPrekrseno = true;
      this.ucitavanje = false;
      this.dataSource = [];
    }

  }

  pronadjiSveProizvodjace() {
    this.proizvodjacService.pronadjiSveProizvodjace()
      .pipe(takeWhile(() => this.alive))
      .subscribe(res => {
        this.proizvodjaci = res;
        this.izabraniProizvodjac = this.proizvodjaci[0].naziv;
      },
        error => {
          this.proizvodjaci = null;
          console.log('Pronaci svu robu je bacilo gresku', error);
        });
  }

  paginatorEvent(pageEvent) {
    this.dataSource = [];
    this.rowsPerPage = pageEvent.pageSize;
    this.pageIndex = pageEvent.pageIndex;
    this.pronadjiSvuRobu(this.searchValue);
  }

  sortData(sort: Sort) {
    this.sort = sort;
    this.pronadjiSvuRobu(this.searchValue);
  }

  toogleFilterDiv() {
    this.otvoriFilterDiv = !this.otvoriFilterDiv;
  }

  resetujFilter() {
    this.izabranaRaspolozivost = this.raspolozivost[0];
    this.izabraniProizvodjac = this.proizvodjaci[0].naziv;
  }
}
