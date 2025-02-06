import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOrgComponent } from './new-org.component';

describe('NewOrgComponent', () => {
  let component: NewOrgComponent;
  let fixture: ComponentFixture<NewOrgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewOrgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
