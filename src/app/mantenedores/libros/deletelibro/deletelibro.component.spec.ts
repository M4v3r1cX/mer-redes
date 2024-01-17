import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletelibroComponent } from './deletelibro.component';

describe('DeletelibroComponent', () => {
  let component: DeletelibroComponent;
  let fixture: ComponentFixture<DeletelibroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeletelibroComponent]
    });
    fixture = TestBed.createComponent(DeletelibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
