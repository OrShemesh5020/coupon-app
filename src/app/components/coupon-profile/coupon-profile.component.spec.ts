import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponProfileComponent } from './coupon-profile.component';

describe('CouponProfileComponent', () => {
  let component: CouponProfileComponent;
  let fixture: ComponentFixture<CouponProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouponProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
