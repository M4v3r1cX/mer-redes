import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtmComponent } from './addtm.component';

describe('AddtmComponent', () => {
  let component: AddtmComponent;
  let fixture: ComponentFixture<AddtmComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddtmComponent]
    });
    fixture = TestBed.createComponent(AddtmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
