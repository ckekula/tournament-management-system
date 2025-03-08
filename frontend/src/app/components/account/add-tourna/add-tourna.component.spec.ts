import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTournaComponent } from './add-tourna.component';

describe('AddTournaComponent', () => {
  let component: AddTournaComponent;
  let fixture: ComponentFixture<AddTournaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTournaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTournaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
