import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalTermsAndConditionsComponent } from './modal-terms-and-conditions.component';

describe('ModalTermsAndConditionsComponent', () => {
  let component: ModalTermsAndConditionsComponent;
  let fixture: ComponentFixture<ModalTermsAndConditionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalTermsAndConditionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalTermsAndConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
