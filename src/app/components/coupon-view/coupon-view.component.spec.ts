import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponViewComponent } from './coupon-view.component';

describe('CouponViewComponent', () => {
  let component: CouponViewComponent;
  let fixture: ComponentFixture<CouponViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouponViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
