import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { Roba, RobaPage } from '../model/roba';
import { map } from 'rxjs/operators';
import { HttpParams } from '@angular/common/http';
import { Sort } from '@angular/material';

const DOMAIN_URL = 'http://localhost:8080/api'
const ROBA_URL = '/roba'

@Injectable({
  providedIn: 'root'
})
export class RobaService {


  constructor(private http: Http) { }

  public pronadjiSvuRobu(sort: Sort ,pageSize, page, searchValue): Observable<RobaPage> {
    let fullUrl = DOMAIN_URL + ROBA_URL;
    if(pageSize != null && page != null) {
      fullUrl = fullUrl + '?pageSize=' + pageSize + "&page=" + page;
    }
    if(sort) {
      fullUrl = fullUrl 
      + '&sortBy=' + sort.active.toLocaleUpperCase()
      + "&sortDirection=" + sort.direction.toLocaleUpperCase();
    }
    if(searchValue && searchValue.length > 2) {
      fullUrl = fullUrl + "&searchTerm="+searchValue;
    } 

    return this.http
      .get(fullUrl)
      .pipe(map((response: any) => response.json()));
  }
}
