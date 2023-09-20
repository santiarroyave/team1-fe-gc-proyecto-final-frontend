import { TestBed } from '@angular/core/testing';

import { ServiciosAlojamientoService } from './servicios-alojamiento.service';

describe('ServiciosAlojamientoService', () => {
  let service: ServiciosAlojamientoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiciosAlojamientoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
