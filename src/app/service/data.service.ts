import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Korpa, RobaKorpa } from '../model/porudzbenica';
import { LocalStorageService } from './local-storage.service';
import { Roba } from '../model/dto';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private korpa: Korpa = this.korpaStorage.vratiKorpuIzMemorije() || new Korpa();
  private korpaSubjekat = new BehaviorSubject(this.korpa);
  public trenutnaKorpa = this.korpaSubjekat.asObservable();

  constructor(private korpaStorage: LocalStorageService) { }

  ubaciUKorpu(robaKorpa: RobaKorpa) {
    if (this.korpa.roba.length === 0) {
      this.korpa.roba.push(robaKorpa);
    } else {
      let daLiPostojiVecUKorpi = false;
      this.korpa.roba.forEach(roba => {
        if (roba.katbr === robaKorpa.katbr) {
          roba.kolicina = roba.kolicina + robaKorpa.kolicina;
          roba.cenaUkupno = roba.kolicina * robaKorpa.cenaKom;
          daLiPostojiVecUKorpi = true;
        }
      });
      if (daLiPostojiVecUKorpi === false) {
        this.korpa.roba.push(robaKorpa);
      }
    }
    this.korpaStorage.cuvajKorpuULokalnojMemoriji(robaKorpa);
    this.korpaSubjekat.next(this.korpa);
  }

  public skiniSaStanjaUkolikoJeUKorpi(robaBaza: Roba[]) {
    const korpa = this.korpaStorage.vratiKorpuIzMemorije();
    if (korpa && robaBaza) {
      korpa.roba.forEach(storage => {
        robaBaza.forEach(roba => {
          if (storage.katbr === roba.katbr) {
            roba.stanje = roba.stanje - storage.kolicina;
          }
        });
      });
    }
  }
  public izbaciIzKorpe(index: number) {
    this.korpa.roba.splice(index, 1);
    this.korpaStorage.izbaciIzMemorije(index);
    this.korpaSubjekat.next(this.korpa);
  }
}
