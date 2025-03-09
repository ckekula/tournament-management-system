import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandingsTableComponent } from './standings-table.component';

describe('StandingsTableComponent', () => {
  let component: StandingsTableComponent;
  let fixture: ComponentFixture<StandingsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StandingsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StandingsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
