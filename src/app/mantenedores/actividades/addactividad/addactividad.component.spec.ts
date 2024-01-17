import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddactividadComponent } from './addactividad.component';

describe('AddactividadComponent', () => {
  let component: AddactividadComponent;
  let fixture: ComponentFixture<AddactividadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddactividadComponent]
    });
    fixture = TestBed.createComponent(AddactividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
