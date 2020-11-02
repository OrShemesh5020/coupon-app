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
    })
  }



  addCoupon() {
    console.log('the addCoupon function is not finish yet');
    // const coupon = new Coupon()
  }

  updateCoupon() {
    console.log('the updateCoupon function is not finish yet');
  }

  deleteCoupon(id: number) {
    this.companyService.deleteCoupon(id);
    this.coupons = this.companyService.currentCoupons;
  }

  getCouponById(id: number) {
    this.companyService.getCouponById(id).subscribe((value: Coupon) => {
      console.log(value);
    });
  }

  getCouponByTitle(title: string) {
    this.companyService.getCouponByTitle(title).subscribe((value: Coupon) => {
      console.log(value);
    });
  }

  getCompanyCouponsByPrice(price: number) {
    this.companyService.getCompanyCouponsByPrice(price).subscribe((values: Coupon[]) => {
      this.coupons = values;
      console.log(values);
    });
  }

  getAllCoupons(): void {
    this.companyService.loadCoupons().subscribe((values: Coupon[]) => {
      this.coupons = values;
      console.log(values);
    });
  }

  getDetails() {
    this.companyService.getDetails().subscribe((value: Company) => {
      this.company = value;
    })
  }
}
