import { Page } from './page';

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