import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddoaComponent } from './addoa.component';

describe('AddoaComponent', () => {
  let component: AddoaComponent;
  let fixture: ComponentFixture<AddoaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddoaComponent]
    });
    fixture = TestBed.createComponent(AddoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
