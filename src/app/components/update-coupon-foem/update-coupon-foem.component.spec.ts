import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCouponFoemComponent } from './update-coupon-foem.component';

describe('UpdateCouponFoemComponent', () => {
  let component: UpdateCouponFoemComponent;
  let fixture: ComponentFixture<UpdateCouponFoemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateCouponFoemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCouponFoemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
