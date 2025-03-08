import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgCardComponent } from './org-card.component';

describe('OrgCardComponent', () => {
  let component: OrgCardComponent;
  let fixture: ComponentFixture<OrgCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrgCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrgCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
