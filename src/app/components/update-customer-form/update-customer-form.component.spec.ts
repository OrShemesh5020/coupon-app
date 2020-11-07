import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCustomerFormComponent } from './update-customer-form.component';

describe('UpdateCustomerFormComponent', () => {
  let component: UpdateCustomerFormComponent;
  let fixture: ComponentFixture<UpdateCustomerFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateCustomerFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCustomerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
