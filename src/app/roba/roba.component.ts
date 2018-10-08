import { Component, OnInit } from '@angular/core';
import { RobaService } from '../service/roba.service';
import { Roba } from '../model/roba';
import { takeWhile } from 'rxjs/operators';
import { LoadingData } from '../model/loading';
import { Sort } from '@angular/material';

@Component({
  selector: 'app-roba',
  templateUrl: './roba.component.html',
  styleUrls: ['./roba.component.css']
})
export class RobaComponent implements OnInit {

  public roba: Roba[];

  //Paging and Sorting elements
  public rowsPerPage = 10;
  public pageIndex = 0;
  public sort = null;
  public tableLength;

  public searchValue = '';

  public displayedColumns: string[] = ['katbr', 'katbrpro', 'naziv'
  , 'proizvodjac', 'grupa', 'podGrupa', 'cena', 'stanje']
  public dataSource: any;

  private alive = true;

  constructor(private robaService: RobaService) { }

  ngOnInit() {
    this.pronadjiSvuRobu(this.searchValue);
  }

  pronadjiSvuRobu(searchValue) {
    this.robaService.pronadjiSvuRobu(this.sort ,this.rowsPerPage, this.pageIndex, searchValue)
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
        console.log("Podnaci robu izbacilo je gresko")
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
}
