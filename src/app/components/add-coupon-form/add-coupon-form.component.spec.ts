import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCouponFormComponent } from './add-coupon-form.component';

describe('AddCouponFormComponent', () => {
  let component: AddCouponFormComponent;
  let fixture: ComponentFixture<AddCouponFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCouponFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCouponFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
