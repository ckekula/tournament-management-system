import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupStageComponent } from './group-stage.component';

describe('GroupStageComponent', () => {
  let component: GroupStageComponent;
  let fixture: ComponentFixture<GroupStageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GroupStageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupStageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
