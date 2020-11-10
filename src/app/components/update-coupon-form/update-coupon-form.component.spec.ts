import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCouponFormComponent } from './update-coupon-form.component';

describe('UpdateCouponFoemComponent', () => {
  let component: UpdateCouponFormComponent;
  let fixture: ComponentFixture<UpdateCouponFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateCouponFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCouponFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
