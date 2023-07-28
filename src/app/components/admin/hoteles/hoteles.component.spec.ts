import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelesComponent } from './hoteles.component';

describe('HotelesComponent', () => {
  let component: HotelesComponent;
  let fixture: ComponentFixture<HotelesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HotelesComponent]
    });
    fixture = TestBed.createComponent(HotelesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
