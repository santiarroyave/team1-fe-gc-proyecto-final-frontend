import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritosCardComponent } from './favoritos-card.component';

describe('FavoritosCardComponent', () => {
  let component: FavoritosCardComponent;
  let fixture: ComponentFixture<FavoritosCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FavoritosCardComponent]
    });
    fixture = TestBed.createComponent(FavoritosCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
