import { GeneralService } from './../../service/general';
import { AuthenticationService } from 'src/app/service/authentication';
import { Router } from '@angular/router';
import { Coupon } from './../../models/coupon';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from './../../service/customer';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-home',
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.scss'],
})
export class CustomerHomeComponent implements OnInit {
  customer: Customer;
  coupons: Coupon[];

  constructor(
    private customerService: CustomerService,
    private generalService: GeneralService,
    private router: Router,
    private authentication: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.getDetails();
    this.customerService.loadCoupons().subscribe((values: Coupon[]) => {
      this.coupons = values;
    });
  }

  getDetails(): void {
    this.customerService.getCustomerDetails().subscribe((value: Customer) => {
      this.customer = value;
      console.log(value);
    });
  }
  updateDetails(): void {
    this.router.navigate([`${this.authentication.getUrl}/update-details`, this.customer.id]);
  }
  purchaseCoupon(couponId: number): void {
    this.customerService.getCoupon(couponId).subscribe((value: Coupon) => {
      this.customerService.purchaseCoupon(value).subscribe(() => {
        this.loadCoupons();
      });
    });
  }
  removePurchasedCoupon(couponId: number): void {
    this.customerService.removePurchasedCoupon(couponId).subscribe(() => {
      this.loadCoupons();
    });
  }
  getCoupon(couponId: number): void {
    this.customerService.getCoupon(couponId).subscribe((value: Coupon) => {
      console.log(value);
    });
  }
  getCustomerCouponsByCategory(categoryId: number): void {
    this.customerService
      .getCustomerCouponsByCategory(categoryId)
      .subscribe((values: Coupon[]) => {
        this.coupons = values;
        console.log(values);
      });
  }
  getCustomerCouponsByPrice(price: number): void {
    this.customerService
      .getCustomerCouponsByPrice(price)
      .subscribe((values: Coupon[]) => {
        this.coupons = values;
        console.log(values);
      });
  }
  loadCoupons(): void {
    this.customerService.loadCoupons().subscribe((values: Coupon[]) => {
      this.coupons = values;
      console.log(values);
    });
  }
  showCoupons(): Coupon[]{
    return this.coupons;
  }
  showAvailableCoupons(): Coupon[]{
    Coupon [] availableCoupons = this.generalService.loadCoupons();
  }
}
