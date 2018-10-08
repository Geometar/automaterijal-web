
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavigacijaComponent } from './navigacija.component';

describe('NavigacijaComponent', () => {
  let component: NavigacijaComponent;
  let fixture: ComponentFixture<NavigacijaComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatSidenavModule],
      declarations: [NavigacijaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavigacijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
