import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StageTabsComponent } from './stage-tabs.component';

describe('StageTabsComponent', () => {
  let component: StageTabsComponent;
  let fixture: ComponentFixture<StageTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StageTabsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StageTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
