import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AntifrizComponent } from './antifriz.component';

describe('AntifrizComponent', () => {
  let component: AntifrizComponent;
  let fixture: ComponentFixture<AntifrizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AntifrizComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AntifrizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
