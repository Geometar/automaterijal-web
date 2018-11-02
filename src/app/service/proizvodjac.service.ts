import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { map, timeout, catchError } from 'rxjs/operators';
import { Proizvodjac } from '../model/proizvodjac';

const DOMAIN_URL = 'http://localhost:8080/api';
const ROBA_URL = '/proizvodjaci';
const FILTERI_URL = '/filteri';
const AKUMULATORI_URL = '/akumulatori';
const ULJA_URL = '/ulja';
const MOTORNA_UTL = '/motorna';

@Injectable({
  providedIn: 'root'
})
export class ProizvodjacService {

  constructor(private http: Http) { }

  public pronadjiSveProizvodjace(): Observable<Proizvodjac[]> {
    const fullUrl = DOMAIN_URL + ROBA_URL;

    return this.http
        .get(fullUrl)
        .pipe(map((response: any) => response.json()));
  }

  public pronadjiSveProizvodjaceFiltera(): Observable<Proizvodjac[]> {
    const fullUrl = DOMAIN_URL + ROBA_URL + FILTERI_URL;

    return this.http
        .get(fullUrl)
        .pipe(map((response: any) => response.json()));
  }

  public pronadjiSveProizvodjaceAkumulatora(): Observable<Proizvodjac[]> {
    const fullUrl = DOMAIN_URL + ROBA_URL + AKUMULATORI_URL;

    return this.http
        .get(fullUrl)
        .pipe(map((response: any) => response.json()));
  }

  public pronadjiSveProizvodjaceUljaPoVrsti(vrstaUlja): Observable<Proizvodjac[]> {
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
    return this.http
        .get(fullUrl)
        .pipe(map((response: any) => response.json()));
  }

}
