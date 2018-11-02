import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MotornaComponent } from './motorna.component';

describe('MotornaComponent', () => {
  let component: MotornaComponent;
  let fixture: ComponentFixture<MotornaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MotornaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MotornaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
