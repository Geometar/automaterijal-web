import { Injectable } from '@angular/core';
import { Proizvodjac } from '../model/proizvodjac';
import { Roba } from '../model/roba';
import { RobaKorpa, Korpa } from '../model/porudzbenica';
import { DataService } from '../service/data.service';

@Injectable({
  providedIn: 'root'
})
export class AppUtilsService {

  constructor(private dataService: DataService) { }

  public vratiIdProizvodjacaAkoPostoji(izabraniProizvodjac: string, proizvodjaci: Proizvodjac[]): string {
    let proId = null;
    if (izabraniProizvodjac && izabraniProizvodjac === 'SVI') {
      proId = null;
    } else {
      proizvodjaci.forEach(pr => {
        if (pr.naziv === izabraniProizvodjac) {
          proId = pr.proid;
        }
      });
    }
    return proId;
  }

  public daLiRobaTrebaDaBudeNaStanju(raspolozivost: string[], izabranaRaspolozivost: string): boolean {
    if (raspolozivost && izabranaRaspolozivost === raspolozivost[1]) {
      return null;
    } else {
      return false;
    }
  }

  public dodajUKorpu(roba: Roba): string {
    let snackBarPoruka = 'Artikal je ubacen u korpu.';
    if (roba.kolicina == null) {
      roba.kolicina = 1;
    }
    if (roba.stanje < roba.kolicina) {
      snackBarPoruka = 'Maksimalan kolicina ' + roba.stanje + '. ' + snackBarPoruka;
      roba.kolicina = roba.stanje;
    }
    const robaKorpa = new RobaKorpa(roba.katbr, roba.katbrpro, roba.naziv, roba.proizvodjac, roba.kolicina, roba.cena, roba.stanje);
    this.dataService.ubaciUKorpu(robaKorpa);
    return snackBarPoruka;
  }

  public izbrisiRobuSaStanja(roba: Roba[], robaUKorpi: Roba) {
    roba.forEach(robaBaza => {
      if (robaBaza.katbr === robaUKorpi.katbr) {
        robaBaza.stanje = robaBaza.stanje - robaUKorpi.kolicina;
      }
    });
  }

  public daLiJeRobaUKorpi(korpa: Korpa, katBr: string) {
    let uKorpi = false;
    korpa.roba.forEach(r => {
      if (r.katbr === katBr) {
        uKorpi = true;
      }
    });
    return uKorpi;
  }
}
