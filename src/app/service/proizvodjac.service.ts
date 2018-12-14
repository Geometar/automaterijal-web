import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, timeoutWith, catchError } from 'rxjs/operators';
import { Proizvodjac } from '../model/dto';
import { AppUtilsService } from '../utils/app-utils.service';
import { HttpClient } from '@angular/common/http';

const DOMAIN_URL = 'http://localhost:8080/api';
const ROBA_URL = '/proizvodjaci';
const FILTERI_URL = '/filteri';
const AKUMULATORI_URL = '/akumulatori';
const ULJA_URL = '/ulja';

const TIMEOUT = 15000;
const TIMEOUT_ERROR = 'Timeout error!';

@Injectable({
  providedIn: 'root'
})
export class ProizvodjacService {

  constructor(private http: HttpClient, private utils: AppUtilsService) { }

  public pronadjiSveProizvodjace(): Observable<any> {
    const fullUrl = DOMAIN_URL + ROBA_URL;

    return this.http
        .get(fullUrl)
        .pipe(
          timeoutWith(TIMEOUT, throwError(TIMEOUT_ERROR)),
          catchError((error: any) => throwError(error))
        );
  }

  public pronadjiSveProizvodjaceFiltera(): Observable<any> {
    const fullUrl = DOMAIN_URL + ROBA_URL + FILTERI_URL;

    return this.http
        .get(fullUrl)
        .pipe(
          timeoutWith(TIMEOUT, throwError(TIMEOUT_ERROR)),
          catchError((error: any) => throwError(error))
        );
  }

  public pronadjiSveProizvodjaceAkumulatora(): Observable<any> {
    const fullUrl = DOMAIN_URL + ROBA_URL + AKUMULATORI_URL;

    return this.http
        .get(fullUrl)
        .pipe(
          timeoutWith(TIMEOUT, throwError(TIMEOUT_ERROR)),
          catchError((error: any) => throwError(error))
        );
  }

  public pronadjiSveProizvodjaceUljaPoVrsti(vrstaUlja): Observable<any> {
    const fullUrl = DOMAIN_URL + ROBA_URL + ULJA_URL + this.utils.vratiPutDoResursaZaUlje(vrstaUlja);

    return this.http
        .get(fullUrl)
        .pipe(
          timeoutWith(TIMEOUT, throwError(TIMEOUT_ERROR)),
          catchError((error: any) => throwError(error))
        );
  }
}
