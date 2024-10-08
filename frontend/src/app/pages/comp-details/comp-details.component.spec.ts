import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompDetailsComponent } from './comp-details.component';

describe('CompDetailsComponent', () => {
  let component: CompDetailsComponent;
  let fixture: ComponentFixture<CompDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
