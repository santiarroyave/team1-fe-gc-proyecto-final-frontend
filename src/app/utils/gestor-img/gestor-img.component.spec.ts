import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestorImgComponent } from './gestor-img.component';

describe('GestorImgComponent', () => {
  let component: GestorImgComponent;
  let fixture: ComponentFixture<GestorImgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestorImgComponent]
    });
    fixture = TestBed.createComponent(GestorImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
