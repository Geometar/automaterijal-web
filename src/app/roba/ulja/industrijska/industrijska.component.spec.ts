import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustrijskaComponent } from './industrijska.component';

describe('IndustrijskaComponent', () => {
  let component: IndustrijskaComponent;
  let fixture: ComponentFixture<IndustrijskaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndustrijskaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndustrijskaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
