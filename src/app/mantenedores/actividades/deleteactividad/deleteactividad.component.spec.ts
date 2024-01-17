import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteactividadComponent } from './deleteactividad.component';

describe('DeleteactividadComponent', () => {
  let component: DeleteactividadComponent;
  let fixture: ComponentFixture<DeleteactividadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteactividadComponent]
    });
    fixture = TestBed.createComponent(DeleteactividadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
