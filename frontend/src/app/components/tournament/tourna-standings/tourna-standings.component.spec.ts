import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TournaStandingsComponent } from './tourna-standings.component';

describe('TournaStandingsComponent', () => {
  let component: TournaStandingsComponent;
  let fixture: ComponentFixture<TournaStandingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TournaStandingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TournaStandingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
