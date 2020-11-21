import { AuthenticationService } from 'src/app/service/authentication';
import { CompanyService } from './../../service/company';
import { Company } from './../../models/company';
import { Coupon } from './../../models/coupon';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-home',
  templateUrl: './company-home.component.html',
  styleUrls: ['./company-home.component.scss'],
})
export class CompanyHomeComponent implements OnInit {
  company: Company;
  coupons: Coupon[];
  couponsByCategory = {};

  constructor(
    private companyService: CompanyService,
    private router: Router,
    private authentication: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.companyService.loadCoupons().subscribe((values: Coupon[]) => {
      this.coupons = values;
      this.filterByCategory();
    });
  }

  addCoupon(): void {
    this.router.navigate([`${this.authentication.getUrl}/add-coupon`]);
  }

  // updateCoupon(couponId: number): void {
  //   this.router.navigate([`${this.authentication.getUrl}/update/coupon`, couponId]);
  // }

  // deleteCoupon(id: number): void {
  //   this.companyService.deleteCoupon(id).subscribe(() => {
  //     this.getAllCoupons();
  //   });
  // }

  // getCouponById(id: number): void {
  //   this.companyService.getCouponById(id).subscribe((value: Coupon) => {
  //     console.log(value);
  //   });
  // }

  getCouponByTitle(title: string): void {
    this.companyService.getCouponByTitle(title).subscribe((value: Coupon) => {
      this.coupons = [];
      this.coupons.push(value);
      this.refreshCoupons();

    });
  }

  getCompanyCouponsByPrice(price: number): void {
    this.companyService
      .getCompanyCouponsByPrice(price)
      .subscribe((values: Coupon[]) => {
        this.coupons = values;
        console.log(values);
        this.refreshCoupons();
      });
  }

  getCompanyCouponsByCategory(categoryId: number): void {
    this.companyService
      .getCompanyCouponsByCategory(categoryId)
      .subscribe((values: Coupon[]) => {
        this.coupons = values;
        console.log(values);
        this.refreshCoupons();
      });
  }

  // updateCompany(): void {
  //   this.router.navigate([`${this.authentication.getUrl}/update/details`]);
  // }

  getAllCoupons(): void {
    this.companyService.loadCoupons().subscribe((values: Coupon[]) => {
      this.coupons = values;
      console.log(values);
      this.refreshCoupons();
    });
  }

  getDetails(): void {
    this.companyService.getDetails().subscribe((value: Company) => {
      this.company = value;
    });
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

  filterCoupons(filterEelement: HTMLSelectElement): void {
    const selectedFilter =
      filterEelement.options[filterEelement.selectedIndex].value;
    switch (selectedFilter) {
      case 'companyCouponsByCategory':
        this.getCompanyCouponsByCategory(2);
        break;
      case 'companyCouponsByPrice':
        this.getCompanyCouponsByPrice(1000);
        break;
      case 'displayCouponByTitle':
        this.getCouponByTitle('phone');
        break;
      default:
          this.getAllCoupons();
          break;
    }
  }
  refreshCoupons(): void {
    this.couponsByCategory = {};
    this.filterByCategory();
  }
  openCouponProfile(coupon: Coupon): void {
    this.router.navigate([`${this.authentication.getUrl}/coupon-details`, coupon.id]);
  }
}
