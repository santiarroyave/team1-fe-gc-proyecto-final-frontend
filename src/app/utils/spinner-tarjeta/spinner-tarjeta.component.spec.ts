import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerTarjetaComponent } from './spinner-tarjeta.component';

describe('SpinnerTarjetaComponent', () => {
  let component: SpinnerTarjetaComponent;
  let fixture: ComponentFixture<SpinnerTarjetaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpinnerTarjetaComponent]
    });
    fixture = TestBed.createComponent(SpinnerTarjetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
