import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageCompComponent } from './manage-comp.component';

describe('ManageCompComponent', () => {
  let component: ManageCompComponent;
  let fixture: ComponentFixture<ManageCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageCompComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
