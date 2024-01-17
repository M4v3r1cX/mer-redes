import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TmmaintainerComponent } from './tmmaintainer.component';

describe('TmmaintainerComponent', () => {
  let component: TmmaintainerComponent;
  let fixture: ComponentFixture<TmmaintainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TmmaintainerComponent]
    });
    fixture = TestBed.createComponent(TmmaintainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
