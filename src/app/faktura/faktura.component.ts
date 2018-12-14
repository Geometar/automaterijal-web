import { Component, OnInit } from '@angular/core';
import { LoginService } from '../service/login.service';
import { Partner, Fakutra, FakturaPage } from '../model/dto';
import { FakturaService } from '../service/faktura.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-faktura',
  templateUrl: './faktura.component.html',
  styleUrls: ['./faktura.component.scss']
})
export class FakturaComponent implements OnInit {

  public partner: Partner;
  private fakure: Fakutra[];
  public dataSource: any;
  
  public error = false;

  // Paging and Sorting elements
  public rowsPerPage = 10;
  public pageIndex = 0;
  public sort = null;
  public tableLength;

  public displayedColumns: string[] = ['orderId', 'nacinPlacanja', 'nacinPrevoza'
  , 'adresa', 'napomena', 'brojStavki', 'iznos', 'vremePorucivanja', 'status', 'ackije'];

  constructor(
    private loginServis: LoginService,
    private fakturaService: FakturaService,
    private router: Router) { }

  ngOnInit() {
    this.loginServis.ulogovaniPartner.subscribe(partner => this.partner = partner);
    this.vratiFaktureKorisnika();
  }

  vratiFaktureKorisnika() {
    this.fakturaService.vratiFaktureKorisnika(this.pageIndex, this.rowsPerPage, this.partner.ppid)
    .subscribe((res: FakturaPage) => {
      this.error = false;
      this.fakure = res.content;
      this.dataSource = this.fakure;
      this.rowsPerPage = res.size;
      this.pageIndex = res.number;
      this.tableLength = res.totalElements;
    },
      error => {
        this.error = true;
        console.log('Pronaci fakture je bacilo gresku', error);
      });
  }

  paginatorEvent(pageEvent) {
    this.dataSource = [];
    this.rowsPerPage = pageEvent.pageSize;
    this.pageIndex = pageEvent.pageIndex;
    this.vratiFaktureKorisnika();
  }

  detaljiFakture(id: number) {
    this.router.navigate(['/porudzbenice/' + id]);
  }

}
