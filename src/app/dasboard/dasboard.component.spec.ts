
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { DasboardComponent } from './dasboard.component';

describe('DasboardComponent', () => {
  let component: DasboardComponent;
  let fixture: ComponentFixture<DasboardComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DasboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DasboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
