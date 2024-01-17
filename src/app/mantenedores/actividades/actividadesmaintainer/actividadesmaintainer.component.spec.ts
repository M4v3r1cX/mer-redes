import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadesmaintainerComponent } from './actividadesmaintainer.component';

describe('ActividadesmaintainerComponent', () => {
  let component: ActividadesmaintainerComponent;
  let fixture: ComponentFixture<ActividadesmaintainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActividadesmaintainerComponent]
    });
    fixture = TestBed.createComponent(ActividadesmaintainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
