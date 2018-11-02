import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenjackoComponent } from './menjacko.component';

describe('MenjackoComponent', () => {
  let component: MenjackoComponent;
  let fixture: ComponentFixture<MenjackoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenjackoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenjackoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
