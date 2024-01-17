import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteoaComponent } from './deleteoa.component';

describe('DeleteoaComponent', () => {
  let component: DeleteoaComponent;
  let fixture: ComponentFixture<DeleteoaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteoaComponent]
    });
    fixture = TestBed.createComponent(DeleteoaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
