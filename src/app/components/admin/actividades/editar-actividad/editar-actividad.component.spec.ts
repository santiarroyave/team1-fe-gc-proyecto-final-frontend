import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarActividadComponent } from './editar-actividad.component';

describe('EditarActividadComponent', () => {
  let component: EditarActividadComponent;
  let fixture: ComponentFixture<EditarActividadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarActividadComponent]
    });
    fixture = TestBed.createComponent(EditarActividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
