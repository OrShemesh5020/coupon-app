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
  customerCoupons: Coupon[];
  availableCoupons: Coupon[];
  couponsByCategory = {};
  constructor(
    private customerService: CustomerService,
    private generalService: GeneralService,
    private router: Router,
    private authentication: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.loadCoupons();
  }
  getCustomerCouponsByCategory(categoryId: number): void {
    this.customerService
      .getCustomerCouponsByCategory(categoryId)
      .subscribe((values: Coupon[]) => {
        this.customerCoupons = values;
        this.refreshCoupons();
      });
  }
  getCustomerCouponsByPrice(price: number): void {
    this.customerService
      .getCustomerCouponsByPrice(price)
      .subscribe((values: Coupon[]) => {
        this.customerCoupons = values;
        this.refreshCoupons();
      });
  }
  loadCoupons(): void {
    this.couponsByCategory = {};
    this.customerService.loadCoupons().subscribe((values: Coupon[]) => {
      this.customerCoupons = values;
      this.filterByCategory();
    });
  }

  openCouponProfile(coupon: Coupon): void {
    this.router.navigate([`${this.authentication.getUrl}/coupon-details`, coupon.id]);
  }
  filterByCategory(): void {
    this.customerCoupons.forEach((coupon: Coupon) => {
      if (!this.couponsByCategory[coupon.categoryName]) {
        this.couponsByCategory[coupon.categoryName] = [coupon];
      } else {
        this.couponsByCategory[coupon.categoryName].push(coupon);
      }
    });
  }
  showAvailableCoupons(): void {
    this.generalService.loadCoupons().subscribe((values: Coupon[]) => {
      this.availableCoupons = values;
    });
  }
  refreshCoupons(): void {
    this.couponsByCategory = {};
    this.filterByCategory();
  }
  filterCoupons(filterEelement: HTMLSelectElement): void {
    const selectedFilter =
      filterEelement.options[filterEelement.selectedIndex].value;
    switch (selectedFilter) {
      case 'couponsByCategory':
        this.getCustomerCouponsByCategory(2);
        break;
      case 'couponsByPrice':
        this.getCustomerCouponsByPrice(1000);
        break;
      default:
        this.loadCoupons();
        break;
    }
  }
}
