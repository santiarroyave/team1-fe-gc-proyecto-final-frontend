import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaItemComponent } from './reserva-item.component';

describe('ReservaItemComponent', () => {
  let component: ReservaItemComponent;
  let fixture: ComponentFixture<ReservaItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservaItemComponent]
    });
    fixture = TestBed.createComponent(ReservaItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
