import { CompanyService } from './../../service/company';
import { Company } from './../../models/company';
import { Coupon } from './../../models/coupon';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-home',
  templateUrl: './company-home.component.html',
  styleUrls: ['./company-home.component.scss']
})
export class CompanyHomeComponent implements OnInit {
  company: Company;
  coupons: Coupon[];

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    this.getDetails();
    this.companyService.loadCoupons().subscribe((values: Coupon[]) => {
      this.coupons = values;
    });
  }

  public get companyName() {
    return this.company.name;
  }


  addCoupon(categoryName: string, title: string, description: string, amount: number, price: number, image: string): void {
    const startDate = new Date(2020, 11, 20);
    const endDate = new Date(2022, 10, 10);
    const coupon = new Coupon(this.company.name, categoryName, title, description, startDate, endDate, amount, price, image);
    this.companyService.addCoupon(coupon).subscribe((value: Coupon) => {
      console.log(value);
      this.getAllCoupons();
    });
  }

  updateCoupon(couponId: number, title: string): void {
    this.companyService.getCouponById(couponId).subscribe((value: Coupon) => {
      value.title = title;
      this.companyService.updateCoupon(value).subscribe((newValue: Coupon) => {
        console.log(newValue);
        this.getAllCoupons();
      });
    });
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

  updateCompany(name: string, email: string, password: string): void {
    const company = new Company(name, email, password, this.company.id);
    this.companyService.updateDetails(company).subscribe((value: Company) => {
      this.company = value;
    });
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
