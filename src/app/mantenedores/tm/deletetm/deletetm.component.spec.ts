import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletetmComponent } from './deletetm.component';

describe('DeletetmComponent', () => {
  let component: DeletetmComponent;
  let fixture: ComponentFixture<DeletetmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeletetmComponent]
    });
    fixture = TestBed.createComponent(DeletetmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
