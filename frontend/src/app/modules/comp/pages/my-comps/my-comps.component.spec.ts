import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCompsComponent } from './my-comps.component';

describe('MyCompsComponent', () => {
  let component: MyCompsComponent;
  let fixture: ComponentFixture<MyCompsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyCompsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyCompsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
