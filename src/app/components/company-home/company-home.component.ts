import { CompanyService } from './../../service/company';
import { Company } from './../../models/company';
import { AuthenticationService } from './../../service/authentication';
import { Coupon } from './../../models/coupon';
import { User } from './../../models/user';
import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/service/general';
import { BehaviorSubject } from 'rxjs';

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



  addCoupon(): void {
    console.log('the addCoupon function is not finish yet');
    // const coupon = new Coupon()
  }

  updateCoupon(): void {
    console.log('the updateCoupon function is not finish yet');
  }

  deleteCoupon(id: number): void {
    this.companyService.deleteCoupon(id);
    this.getAllCoupons();
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
  // updateCompany(name:string): void {
  //   console.log(`update ${name}`);
  // }

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
