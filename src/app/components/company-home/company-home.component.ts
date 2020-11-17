import { AuthenticationService } from 'src/app/service/authentication';
import { CompanyService } from './../../service/company';
import { Company } from './../../models/company';
import { Coupon } from './../../models/coupon';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-home',
  templateUrl: './company-home.component.html',
  styleUrls: ['./company-home.component.scss']
})
export class CompanyHomeComponent implements OnInit {
  company: Company;
  coupons: Coupon[];

  constructor(private companyService: CompanyService, private router: Router, private authentication: AuthenticationService) { }

  ngOnInit(): void {
    this.getDetails();
    this.companyService.loadCoupons().subscribe((values: Coupon[]) => {
      this.coupons = values;
    });
  }

  addCoupon(): void {
    this.router.navigate([`${this.authentication.getUrl}/add-coupon`]);
  }

  updateCoupon(couponId: number): void {
    this.router.navigate([`${this.authentication.getUrl}/update/coupon`, couponId]);
  }


  deleteCoupon(id: number): void {
    this.companyService.deleteCoupon(id).subscribe(() => {
      this.getAllCoupons();
    });
  }

  getCouponById(id: number): void {
    this.companyService.getCouponById(id).subscribe((value: Coupon) => {
      console.log(value);
    });
  }

  getCouponByTitle(title: string): void {
    this.companyService.getCouponByTitle(title).subscribe((value: Coupon) => {
      console.log(value);
    });
  }

  getCompanyCouponsByPrice(price: number): void {
    this.companyService.getCompanyCouponsByPrice(price).subscribe((values: Coupon[]) => {
      this.coupons = values;
      console.log(values);
    });
  }

  getCompanyCouponsByCategory(categoryId: number): void {
    this.companyService.getCompanyCouponsByCategory(categoryId).subscribe((values: Coupon[]) => {
      this.coupons = values;
      console.log(values);
    });
  }

  updateCompany(): void {
    this.router.navigate([`${this.authentication.getUrl}/update/details`]);
  }

  getAllCoupons(): void {
    this.companyService.loadCoupons().subscribe((values: Coupon[]) => {
      this.coupons = values;
      console.log(values);
    });
  }

  getDetails(): void {
    this.companyService.getDetails().subscribe((value: Company) => {
      this.company = value;
    });
  }
}
