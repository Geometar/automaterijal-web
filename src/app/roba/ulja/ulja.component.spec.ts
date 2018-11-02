import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UljaComponent } from './ulja.component';

describe('UljaComponent', () => {
  let component: UljaComponent;
  let fixture: ComponentFixture<UljaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UljaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UljaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
