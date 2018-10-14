import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { map, timeout, catchError } from 'rxjs/operators';
import { Proizvodjac } from '../model/proizvodjac';

const DOMAIN_URL = 'http://localhost:8080/api'
const ROBA_ULR = '/proizvodjaci';

@Injectable({
  providedIn: 'root'
})
export class ProizvodjacService {

  constructor(private http: Http) { }

  public pronadjiSveProizvodjace(): Observable<Proizvodjac[]> {
    const fullUrl = DOMAIN_URL + ROBA_ULR;

    return this.http
        .get(fullUrl)
        .pipe(map((response: any) => response.json()));
  }
}
