import { Router } from '@angular/router';
import { AuthenticationService } from './../../service/authentication';
import { GeneralService } from './../../service/general';
import { Coupon } from './../../models/coupon';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  coupons: Coupon[];
  couponsByCategory = {};

  constructor(private generalService: GeneralService, private authentication: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.loadCoupons();
  }

  loadCoupons(): void {
    this.generalService.loadCoupons().subscribe((values: Coupon[]) => {
      this.coupons = values.filter((value: Coupon) => {
        return (new Date(value.startDate).valueOf()) <= new Date().valueOf() && value.amount > 0;
      });
      this.refreshCoupons();
    });
  }

  openProfile(coupon: Coupon): void {
    this.router.navigate(['home/public/coupon-details', coupon.id]);
  }

  getCompanyCouponsByCategory(categoryName: string): void {
    this.coupons = this.coupons.filter((value: Coupon) => {
      return value.categoryName === categoryName;
    });
    this.refreshCoupons();
  }

  getCompanyCouponsByPrice(price: number): void {
    this.coupons = this.coupons.filter((value: Coupon) => {
      return value.price <= price;
    });
    this.refreshCoupons();
  }

  getCouponsByTitle(title: string): void {
    this.coupons = this.coupons.filter((value: Coupon) => {
      return value.title === title;
    });
    this.refreshCoupons();
  }

  filterCoupons(filterEelement: HTMLSelectElement): void {
    const selectedFilter =
      filterEelement.options[filterEelement.selectedIndex].value;
    switch (selectedFilter) {
      case 'companyCouponsByCategory':
        this.getCompanyCouponsByCategory('food');
        break;
      case 'companyCouponsByPrice':
        this.getCompanyCouponsByPrice(1000);
        break;
      case 'displayCouponByTitle':
        this.getCouponsByTitle('car');
        break;
      default:
        this.loadCoupons();
        break;
    }
  }

  refreshCoupons(): void {
    this.couponsByCategory = {};
    this.filterByCategory();
  }

  filterByCategory(): void {
    this.coupons.forEach((coupon: Coupon) => {
      if (!this.couponsByCategory[coupon.categoryName]) {
        this.couponsByCategory[coupon.categoryName] = [coupon];
      } else {
        this.couponsByCategory[coupon.categoryName].push(coupon);
      }
    });
  }
}
