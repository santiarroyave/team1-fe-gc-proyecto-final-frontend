import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfertaDetalleComponent } from './oferta-detalle.component';

describe('OfertaDetalleComponent', () => {
  let component: OfertaDetalleComponent;
  let fixture: ComponentFixture<OfertaDetalleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OfertaDetalleComponent]
    });
    fixture = TestBed.createComponent(OfertaDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
