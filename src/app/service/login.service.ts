import { Injectable } from '@angular/core';
import { throwError, BehaviorSubject, EMPTY } from 'rxjs';
import { Credentials, Partner } from '../model/dto';
import { timeoutWith, catchError, finalize } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AppUtilsService } from '../utils/app-utils.service';
import { Router } from '@angular/router';
import { LocalStorageService } from './local-storage.service';

const TIMEOUT = 15000;
const TIMEOUT_ERROR = 'Timeout error!';

const DOMAIN_URL = 'http://localhost:8080';
const LOGIN_URL = '/login';
const LOGOUT_URL = '/logout';
const PARTNER_URL = '/api/partner';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private partner: Partner = this.storageServis.procitajPartneraIzMemorije() || new Partner();
  private partnerSubjekat = new BehaviorSubject(this.partner);
  public ulogovaniPartner = this.partnerSubjekat.asObservable();

  private uspesnoLogovanje = true;
  private logovanjeSubjekat = new BehaviorSubject(this.uspesnoLogovanje);
  public daLiJeLogovanjeUspesno = this.logovanjeSubjekat.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private utils: AppUtilsService,
    private storageServis: LocalStorageService) { }

  public ulogujSe(credentials: Credentials) {
    const parameterObject = {};
    parameterObject['username'] = credentials.username;
    parameterObject['password'] = credentials.password;
    parameterObject['submit'] = 'Login';
    const parametersString = this.utils.vratiKveriParametre(parameterObject);
    const fullUrl = DOMAIN_URL + LOGIN_URL + parametersString;

    this.http.post(fullUrl, {}, { responseType: 'text' })
      .pipe(
        timeoutWith(TIMEOUT, throwError(TIMEOUT_ERROR)),
        catchError((error: any) => throwError(error))
      ).subscribe(res => {
        this.vratiUlogovanogKorisnika();
      },
        error => {
          this.logovanjeSubjekat.next(false);
          this.storageServis.logout();
          console.log('Greska kod logovanja');
        });
  }

  public logout() {
    const fullUrl = DOMAIN_URL + LOGOUT_URL;
    this.http.post(fullUrl, {}, { responseType: 'text' })
      .pipe(
        timeoutWith(TIMEOUT, throwError(TIMEOUT_ERROR)),
        catchError((error: any) => throwError(error))
      )
      .subscribe(() => {
        this.partner = new Partner();
        this.logovanjeSubjekat.next(true);
        this.partnerSubjekat.next(this.partner);
        this.storageServis.logout();
        this.router.navigateByUrl('naslovna');
      },
        error => {
          this.logovanjeSubjekat.next(false);
          console.log('Greska kod logout-a');
        });
  }

  private vratiUlogovanogKorisnika() {
    const fullUrl = DOMAIN_URL + PARTNER_URL;
    this.http.get(fullUrl)
      .pipe(
        timeoutWith(TIMEOUT, throwError(TIMEOUT_ERROR)),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 404) {
            this.logovanjeSubjekat.next(false);
            return EMPTY;
          }
          return throwError(error);
        })
      ).subscribe(res => {
        this.partner = res;
        this.storageServis.sacuvajPartneraUMemoriju(this.partner);
        this.partnerSubjekat.next(this.partner);
        this.router.navigateByUrl('naslovna');
      },
        error => {
          console.log('Logovanje nije uspelo.');
        });
  }
}
