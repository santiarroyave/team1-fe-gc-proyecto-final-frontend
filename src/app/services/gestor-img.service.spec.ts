import { TestBed } from '@angular/core/testing';

import { GestorImgService } from './gestor-img.service';

describe('GestorImgService', () => {
  let service: GestorImgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestorImgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
