import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FakturaDetaljiComponent } from './faktura-detalji.component';

describe('FakturaDetaljiComponent', () => {
  let component: FakturaDetaljiComponent;
  let fixture: ComponentFixture<FakturaDetaljiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FakturaDetaljiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FakturaDetaljiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
