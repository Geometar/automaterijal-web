import { Injectable } from '@angular/core';
import { Proizvodjac, Roba } from '../model/dto';
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
    if (roba.kolicina == null || roba.kolicina <= 0) {
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

  public vratiKveriParametre(map) {

    let parameterString = '';

    Object.keys(map).forEach(function (elem, index) {
      const value = map[elem];
      if (value != null || value === 0) {
        if (parameterString) {
          parameterString += '&';
        }

        parameterString += elem + '=' + value;
      }
    });

    if (parameterString) {
      parameterString = '?' + parameterString;
    }
    return parameterString;
  }

  public vratiPutDoResursaZaUlje(vrstaUlja): string {
    let url = '/motorna';
    if (vrstaUlja === 'motorna') {
      url = '/motorna';
    } else if (vrstaUlja === 'menjacka') {
      url = '/menjacka';
    } else if (vrstaUlja === 'kociona') {
      url = '/kociona';
    } else if (vrstaUlja === 'antifriz') {
      url = '/antifriz';
    } else if (vrstaUlja === 'hidraulicna') {
      url = '/hidraulicna';
    } else if (vrstaUlja === 'kompresorska') {
      url = '/kompresorska';
    } else if (vrstaUlja === 'redutktorska') {
      url = '/redutktorska';
    } else if (vrstaUlja === 'transformatorska') {
      url = '/transformatorska';
    } else if (vrstaUlja === 'turbinska') {
      url = '/turbinska';
    } else if (vrstaUlja === 'pneumatska') {
      url = '/pneumatska';
    } else if (vrstaUlja === 'klizna') {
      url = '/klizna';
    } else if (vrstaUlja === 'prenosna') {
      url = '/prenosna';
    }
    return url;
  }
}
