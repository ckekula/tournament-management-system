import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournaCardComponent } from './tourna-card.component';

describe('TournaCardComponent', () => {
  let component: TournaCardComponent;
  let fixture: ComponentFixture<TournaCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TournaCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TournaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
