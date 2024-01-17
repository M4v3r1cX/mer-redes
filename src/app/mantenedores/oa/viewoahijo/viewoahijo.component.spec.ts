import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewoahijoComponent } from './viewoahijo.component';

describe('ViewoahijoComponent', () => {
  let component: ViewoahijoComponent;
  let fixture: ComponentFixture<ViewoahijoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewoahijoComponent]
    });
    fixture = TestBed.createComponent(ViewoahijoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
