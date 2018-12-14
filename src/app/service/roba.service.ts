import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { RobaPage } from '../model/dto';
import { map, timeoutWith, catchError } from 'rxjs/operators';
import { Sort } from '@angular/material';
import { AppUtilsService } from '../utils/app-utils.service';

const DOMAIN_URL = 'http://localhost:8080/api';
const ROBA_URL = '/roba';
const FILTERI_URL = '/filteri';
const AKUMULATORI_URL = '/akumulatori';
const ULJA_URL = '/ulja';

const TIMEOUT = 15000;
const TIMEOUT_ERROR = 'Timeout error!';

@Injectable({
  providedIn: 'root'
})
export class RobaService {


  constructor(private http: Http, private utils: AppUtilsService) { }

  public pronadjiSvuRobu(sort: Sort, pageSize, page, searchValue, naStanju, proizvodjacId): Observable<RobaPage> {
    const parameterObject = {};
    parameterObject['pageSize'] = pageSize;
    parameterObject['page'] = page;
    if (sort) {
      parameterObject['sortBy'] = sort.active.toLocaleUpperCase();
      parameterObject['sortDirection'] = sort.direction.toLocaleUpperCase();
    }
    parameterObject['searchTerm'] = searchValue;
    parameterObject['proizvodjac'] = proizvodjacId;
    parameterObject['naStanju'] = naStanju;
    const parametersString = this.utils.vratiKveriParametre(parameterObject);
    const fullUrl = DOMAIN_URL + ROBA_URL + parametersString;

    return this.http
      .get(fullUrl)
      .pipe(
        map((response: any) => response.json()),
        timeoutWith(TIMEOUT, throwError(TIMEOUT_ERROR)),
        catchError((error: any) => throwError(error))
      );
  }

  public pronadjiFiltere(sort: Sort, pageSize, page, searchValue, naStanju, proizvodjacId): Observable<RobaPage> {
    const parameterObject = {};
    parameterObject['pageSize'] = pageSize;
    parameterObject['page'] = page;
    if (sort) {
      parameterObject['sortBy'] = sort.active.toLocaleUpperCase();
      parameterObject['sortDirection'] = sort.direction.toLocaleUpperCase();
    }
    parameterObject['searchTerm'] = searchValue;
    parameterObject['proizvodjac'] = proizvodjacId;
    parameterObject['naStanju'] = naStanju;
    const parametersString = this.utils.vratiKveriParametre(parameterObject);
    const fullUrl = DOMAIN_URL + ROBA_URL + FILTERI_URL + parametersString;
    return this.http
      .get(fullUrl)
      .pipe(
        map((response: any) => response.json()),
        timeoutWith(TIMEOUT, throwError(TIMEOUT_ERROR)),
        catchError((error: any) => throwError(error))
      );
  }

  public pronadjiAkumulatore(sort: Sort, pageSize, page, searchValue, naStanju, proizvodjacId): Observable<RobaPage> {
    const parameterObject = {};
    parameterObject['pageSize'] = pageSize;
    parameterObject['page'] = page;
    if (sort) {
      parameterObject['sortBy'] = sort.active.toLocaleUpperCase();
      parameterObject['sortDirection'] = sort.direction.toLocaleUpperCase();
    }
    parameterObject['searchTerm'] = searchValue;
    parameterObject['proizvodjac'] = proizvodjacId;
    parameterObject['naStanju'] = naStanju;
    const parametersString = this.utils.vratiKveriParametre(parameterObject);
    const fullUrl = DOMAIN_URL + ROBA_URL + AKUMULATORI_URL + parametersString;
    return this.http
      .get(fullUrl)
      .pipe(
        map((response: any) => response.json()),
        timeoutWith(TIMEOUT, throwError(TIMEOUT_ERROR)),
        catchError((error: any) => throwError(error))
      );
  }

  public pronadjiUlje(sort: Sort, pageSize, page, searchValue, naStanju, proizvodjacId, vrstaUlja): Observable<RobaPage> {
    const parameterObject = {};
    parameterObject['pageSize'] = pageSize;
    parameterObject['page'] = page;
    if (sort) {
      parameterObject['sortBy'] = sort.active.toLocaleUpperCase();
      parameterObject['sortDirection'] = sort.direction.toLocaleUpperCase();
    }
    parameterObject['searchTerm'] = searchValue;
    parameterObject['proizvodjac'] = proizvodjacId;
    parameterObject['naStanju'] = naStanju;
    const parametersString = this.utils.vratiKveriParametre(parameterObject);
    const fullUrl = DOMAIN_URL + ROBA_URL + ULJA_URL + this.utils.vratiPutDoResursaZaUlje(vrstaUlja) + parametersString;
    return this.http
      .get(fullUrl)
      .pipe(
        map((response: any) => response.json()),
        timeoutWith(TIMEOUT, throwError(TIMEOUT_ERROR)),
        catchError((error: any) => throwError(error))
      );
  }
}
