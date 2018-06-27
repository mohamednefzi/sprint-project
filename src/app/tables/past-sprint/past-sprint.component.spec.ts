import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PastSprintComponent } from './past-sprint.component';

describe('PastSprintComponent', () => {
  let component: PastSprintComponent;
  let fixture: ComponentFixture<PastSprintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PastSprintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PastSprintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
