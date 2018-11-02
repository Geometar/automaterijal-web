export class Korpa {
    public roba: RobaKorpa[] = [];
    public ukupno: number;
}

export class RobaKorpa {

    public katbr: string;
    public katbrpro: string;
    public naziv: string;
    public proizvodjac: string;
    public kolicina: number;
    public cenaKom: number;
    public stanje: number;
    public cenaUkupno: number;

    constructor(katbr: string, katbrpro: string, naziv: string, proizvodjac: string, kolicina: number, cena: number, stanje: number) {
        this.katbr = katbr;
        this.katbrpro = katbrpro;
        this.naziv = naziv;
        this.proizvodjac = proizvodjac;
        this.kolicina = kolicina;
        this.cenaKom = cena;
        this.cenaUkupno = cena * kolicina;
        this.stanje = stanje;
    }
}
