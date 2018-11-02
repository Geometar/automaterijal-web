import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AkumulatoriComponent } from './akumulatori.component';

describe('AkumulatoriComponent', () => {
  let component: AkumulatoriComponent;
  let fixture: ComponentFixture<AkumulatoriComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AkumulatoriComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AkumulatoriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
