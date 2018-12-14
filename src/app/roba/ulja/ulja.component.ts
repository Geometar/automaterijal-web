import { Component } from '@angular/core';

@Component({
  selector: 'app-ulja',
  templateUrl: './ulja.component.html',
  styleUrls: ['./ulja.component.css']
})
export class UljaComponent {
  selectedTab = 0;
  changeTab(tabIndex: number) {
    this.selectedTab = tabIndex;
  }
}
