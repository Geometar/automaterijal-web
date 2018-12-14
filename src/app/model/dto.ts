import { Page } from './page';

export class ValueHelp {
   id?: number;
   naziv?: string;
}

export class Roba {
    public katbr: string;
    public katbrpro: string;
    public naziv: string;
    public proizvodjac: string;
    public grupa: string;
    public podGrupa: string;
    public stanje: number;
    public cena: number;
    public kolicina: number;
}

export class RobaPage extends Page {
    content: Roba[] = null;
}

export class Partner {
    ppid?: number;
    naziv?: string;
    email?: string;
    webKorisnik?: string;
    stanje?: number;
    stanjeporoku?: number;
}

export class Fakutra {
    id?: number;
    orderId?: number;
    vremePorucivanja?: string;
    status?: ValueHelp;
    nacinPlacanja?: ValueHelp;
    nacinPrevoza?: ValueHelp;
    adresa?: ValueHelp;
    napomena?: string;
    brojStavki?: number;
    iznos?: number;
    detalji?: FakturaDetalji[];
}

export class FakturaPage extends Page {
    content: Fakutra[] = null;
}

export class FakturaDetalji {
    robaId?: number;
    kataloskiBroj?: string;
    proizvodjac?: string;
    kolicina?: number;
    potvrdjenaKolicina?: number;
    cena?: number;
    status?: ValueHelp;
    rabat?: number;
    vremePorucivanja?: string;
}

export class Proizvodjac {
    public proid: string;
    public naziv: string;
}

export declare class Credentials {
    username?: string;
    password?: boolean;
}
