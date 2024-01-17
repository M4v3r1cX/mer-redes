import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibromaintainerComponent } from './libromaintainer.component';

describe('LibromaintainerComponent', () => {
  let component: LibromaintainerComponent;
  let fixture: ComponentFixture<LibromaintainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LibromaintainerComponent]
    });
    fixture = TestBed.createComponent(LibromaintainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
