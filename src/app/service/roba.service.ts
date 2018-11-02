import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { Roba, RobaPage } from '../model/roba';
import { map } from 'rxjs/operators';
import { Sort } from '@angular/material';

const DOMAIN_URL = 'http://localhost:8080/api';
const ROBA_URL = '/roba';
const FILTERI_URL = '/filteri';
const AKUMULATORI_URL = '/akumulatori';
const ULJA_URL = '/ulja';

@Injectable({
  providedIn: 'root'
})
export class RobaService {


  constructor(private http: Http) { }

  public pronadjiSvuRobu(sort: Sort, pageSize, page, searchValue, naStanju, proizvodjacId): Observable<RobaPage> {
    let fullUrl = DOMAIN_URL + ROBA_URL;
    if (pageSize != null && page != null) {
      fullUrl = fullUrl + '?pageSize=' + pageSize + '&page=' + page;
    }
    if (sort) {
      fullUrl = fullUrl
        + '&sortBy=' + sort.active.toLocaleUpperCase()
        + '&sortDirection=' + sort.direction.toLocaleUpperCase();
    }
    if (searchValue && searchValue.length > 2) {
      fullUrl = fullUrl + '&searchTerm=' + searchValue;
    }
    if (proizvodjacId) {
      fullUrl = fullUrl + '&proizvodjac=' + proizvodjacId;
    }
    if (naStanju != null) {
      fullUrl = fullUrl + '&naStanju=' + naStanju;
    }

    return this.http
      .get(fullUrl)
      .pipe(map((response: any) => response.json()));
  }

  public pronadjiFiltere(sort: Sort, pageSize, page, searchValue, naStanju, proizvodjacId): Observable<RobaPage> {
    let fullUrl = DOMAIN_URL + ROBA_URL + FILTERI_URL;
    if (pageSize != null && page != null) {
      fullUrl = fullUrl + '?pageSize=' + pageSize + '&page=' + page;
    }
    if (sort) {
      fullUrl = fullUrl
        + '&sortBy=' + sort.active.toLocaleUpperCase()
        + '&sortDirection=' + sort.direction.toLocaleUpperCase();
    }
    if (searchValue && searchValue.length > 2) {
      fullUrl = fullUrl + '&searchTerm=' + searchValue;
    }
    if (proizvodjacId) {
      fullUrl = fullUrl + '&proizvodjac=' + proizvodjacId;
    }
    if (naStanju === false) {
      fullUrl = fullUrl + '&naStanju=' + naStanju;
    }
    return this.http
      .get(fullUrl)
      .pipe(map((response: any) => response.json()));
  }

  public pronadjiAkumulatore(sort: Sort, pageSize, page, searchValue, naStanju, proizvodjacId): Observable<RobaPage> {
    let fullUrl = DOMAIN_URL + ROBA_URL + AKUMULATORI_URL;
    if (pageSize != null && page != null) {
      fullUrl = fullUrl + '?pageSize=' + pageSize + '&page=' + page;
    }
    if (sort) {
      fullUrl = fullUrl
        + '&sortBy=' + sort.active.toLocaleUpperCase()
        + '&sortDirection=' + sort.direction.toLocaleUpperCase();
    }
    if (searchValue && searchValue.length > 2) {
      fullUrl = fullUrl + '&searchTerm=' + searchValue;
    }
    if (proizvodjacId) {
      fullUrl = fullUrl + '&proizvodjac=' + proizvodjacId;
    }
    if (naStanju === false) {
      fullUrl = fullUrl + '&naStanju=' + naStanju;
    }
    return this.http
      .get(fullUrl)
      .pipe(map((response: any) => response.json()));
  }

  public pronadjiUlje(sort: Sort, pageSize, page, searchValue, naStanju, proizvodjacId, vrstaUlja): Observable<RobaPage> {
    let fullUrl = DOMAIN_URL + ROBA_URL + ULJA_URL;
    if (vrstaUlja === 'motorna') {
      fullUrl = fullUrl + '/motorna';
    } else if (vrstaUlja === 'menjacka') {
      fullUrl = fullUrl + '/menjacka';
    } else if (vrstaUlja === 'kociona') {
      fullUrl = fullUrl + '/kociona';
    } else if (vrstaUlja === 'antifriz') {
      fullUrl = fullUrl + '/antifriz';
    } else if (vrstaUlja === 'hidraulicna') {
      fullUrl = fullUrl + '/hidraulicna';
    } else if (vrstaUlja === 'kompresorska') {
      fullUrl = fullUrl + '/kompresorska';
    } else if (vrstaUlja === 'redutktorska') {
      fullUrl = fullUrl + '/redutktorska';
    } else if (vrstaUlja === 'transformatorska') {
      fullUrl = fullUrl + '/transformatorska';
    } else if (vrstaUlja === 'turbinska') {
      fullUrl = fullUrl + '/turbinska';
    } else if (vrstaUlja === 'pneumatska') {
      fullUrl = fullUrl + '/pneumatska';
    } else if (vrstaUlja === 'klizna') {
      fullUrl = fullUrl + '/klizna';
    } else if (vrstaUlja === 'prenosna') {
      fullUrl = fullUrl + '/prenosna';
    }
    if (pageSize != null && page != null) {
      fullUrl = fullUrl + '?pageSize=' + pageSize + '&page=' + page;
    }
    if (sort) {
      fullUrl = fullUrl
        + '&sortBy=' + sort.active.toLocaleUpperCase()
        + '&sortDirection=' + sort.direction.toLocaleUpperCase();
    }
    if (searchValue && searchValue.length > 2) {
      fullUrl = fullUrl + '&searchTerm=' + searchValue;
    }
    if (proizvodjacId) {
      fullUrl = fullUrl + '&proizvodjac=' + proizvodjacId;
    }
    if (naStanju === false) {
      fullUrl = fullUrl + '&naStanju=' + naStanju;
    }
    return this.http
      .get(fullUrl)
      .pipe(map((response: any) => response.json()));
  }
}
