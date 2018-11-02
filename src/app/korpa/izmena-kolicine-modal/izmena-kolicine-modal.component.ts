import {Component, Inject, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Roba } from 'src/app/model/roba';
import { RobaKorpa } from 'src/app/model/porudzbenica';
import { LocalStorageService } from 'src/app/service/local-storage.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-izmena-kolicine-modal',
  templateUrl: './izmena-kolicine-modal.component.html',
  styleUrls: ['./izmena-kolicine-modal.component.css']
})
export class IzmenaKolicineModalComponent implements OnInit {

  public stanje = [];
  public data: RobaKorpa;

  constructor(
    public dialogRef: MatDialogRef<IzmenaKolicineModalComponent>,
    @Inject(MAT_DIALOG_DATA) public roba: RobaKorpa) {}

  ngOnInit() {
    this.data = _.clone(this.roba);
    this.popuniSelectStanja();
  }

  popuniSelectStanja() {
    let index = 1;
    while (index <= this.data.stanje) {
      this.stanje[index - 1] = index;
      index++;
    }
  }

  sacuvajIzmene() {
    this.data.kolicina = _.toNumber(this.data.kolicina);
    this.data.cenaUkupno = this.data.kolicina * this.data.cenaKom;
    this.dialogRef.close(this.data);
  }

  bezIzmena() {
    this.dialogRef.close();
  }
}
