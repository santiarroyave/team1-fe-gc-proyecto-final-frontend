import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadItemComponent } from './actividad-item.component';

describe('ActividadItemComponent', () => {
  let component: ActividadItemComponent;
  let fixture: ComponentFixture<ActividadItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActividadItemComponent]
    });
    fixture = TestBed.createComponent(ActividadItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
