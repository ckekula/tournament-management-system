import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompListComponent } from './comp-list.component';

describe('CompListComponent', () => {
  let component: CompListComponent;
  let fixture: ComponentFixture<CompListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
