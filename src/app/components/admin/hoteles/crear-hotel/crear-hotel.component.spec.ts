import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearHotelComponent } from './crear-hotel.component';

describe('CrearHotelComponent', () => {
  let component: CrearHotelComponent;
  let fixture: ComponentFixture<CrearHotelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearHotelComponent]
    });
    fixture = TestBed.createComponent(CrearHotelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
