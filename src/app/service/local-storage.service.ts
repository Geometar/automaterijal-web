import { Injectable, Inject } from '@angular/core';
import { LOCAL_STORAGE, StorageService } from 'angular-webstorage-service';
import { Korpa, RobaKorpa } from '../model/porudzbenica';
import { Roba } from '../model/roba';

const KORPA_KLJUC = 'korpa_roba';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) { }

  public vratiKorpuIzMemorije(): Korpa {
    return this.storage.get(KORPA_KLJUC);
  }

  public cuvajKorpuULokalnojMemoriji(robaKorpa: RobaKorpa) {
    let trenutnaKorpa: Korpa;
    if (this.storage.get(KORPA_KLJUC)) {
      trenutnaKorpa = this.storage.get(KORPA_KLJUC);
      this.ubaciRobuUMemoriju(trenutnaKorpa, robaKorpa);
    } else {
      trenutnaKorpa = new Korpa();
      trenutnaKorpa.roba.push(robaKorpa);
    }

    this.storage.set(KORPA_KLJUC, trenutnaKorpa);
  }

  private ubaciRobuUMemoriju(trenutnaKorpa: Korpa, robaKorpa: RobaKorpa) {
      let daLiPostojiVecUMemoriji = false;
      trenutnaKorpa.roba.forEach(storage => {
        if (storage.katbr === robaKorpa.katbr) {
          storage.kolicina = storage.kolicina + robaKorpa.kolicina;
          storage.cenaUkupno = storage.kolicina * robaKorpa.cenaKom;
          daLiPostojiVecUMemoriji = true;
        }
      });
      if (daLiPostojiVecUMemoriji === false) {
        trenutnaKorpa.roba.push(robaKorpa);
      }
  }

  public izbaciIzMemorije(index: number) {
    const korpa = this.vratiKorpuIzMemorije();
    korpa.roba.splice(index, 1);
    this.storage.set(KORPA_KLJUC, korpa);
  }

  public zameniArtikalSaNovim(robaKorpa: RobaKorpa) {
    const trenutnaKorpa: Korpa = this.storage.get(KORPA_KLJUC);
    trenutnaKorpa.roba.forEach(storage => {
      if (storage.katbr === robaKorpa.katbr) {
        storage.kolicina = robaKorpa.kolicina;
        storage.cenaUkupno = robaKorpa.cenaUkupno;
      }
    });
    this.storage.set(KORPA_KLJUC, trenutnaKorpa);
  }
}
