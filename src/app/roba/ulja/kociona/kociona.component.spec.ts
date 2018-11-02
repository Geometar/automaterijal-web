import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KocionaComponent } from './kociona.component';

describe('KocionaComponent', () => {
  let component: KocionaComponent;
  let fixture: ComponentFixture<KocionaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KocionaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KocionaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
