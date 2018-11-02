import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from '../service/data.service';
import { Korpa } from '../model/porudzbenica';

@Component({
  selector: 'app-navigacija',
  templateUrl: './navigacija.component.html',
  styleUrls: ['./navigacija.component.css']
})
export class NavigacijaComponent implements OnInit {

  public test = 3;
  private korpa: Korpa;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private korpaServis: DataService) { }

  ngOnInit() {
    this.korpaServis.trenutnaKorpa.subscribe(korpa => this.test = korpa.roba.length);
  }

}
