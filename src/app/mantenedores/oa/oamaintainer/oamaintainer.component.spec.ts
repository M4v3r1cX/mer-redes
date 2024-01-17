import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OamaintainerComponent } from './oamaintainer.component';

describe('OamaintainerComponent', () => {
  let component: OamaintainerComponent;
  let fixture: ComponentFixture<OamaintainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OamaintainerComponent]
    });
    fixture = TestBed.createComponent(OamaintainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
