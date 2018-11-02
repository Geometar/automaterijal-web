import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IzmenaKolicineModalComponent } from './izmena-kolicine-modal.component';

describe('IzmenaKolicineModalComponent', () => {
  let component: IzmenaKolicineModalComponent;
  let fixture: ComponentFixture<IzmenaKolicineModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IzmenaKolicineModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IzmenaKolicineModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
