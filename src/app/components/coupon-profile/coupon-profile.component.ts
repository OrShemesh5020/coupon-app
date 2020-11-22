import { Observable } from 'rxjs';
import { Company } from './../../models/company';
import { CustomerService } from './../../service/customer';
import { CompanyService } from './../../service/company';
import { GeneralService } from './../../service/general';
import { ClientType, User } from './../../models/user';
import { AuthenticationService } from './../../service/authentication';
import { Coupon } from './../../models/coupon';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coupon-profile',
  templateUrl: './coupon-profile.component.html',
  styleUrls: ['./coupon-profile.component.scss']
})
export class CouponProfileComponent implements OnInit {
  coupon: Coupon;
  company: Company;
  editable = false;
  purchasable = false;
  cancelable = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private authentication: AuthenticationService,
    private router: Router,
    private generalService: GeneralService,
    private companyService: CompanyService,
    private customerService: CustomerService,
  ) { }

  ngOnInit(): void {
    this.getCompany();
    this.activatedRoute.params.subscribe((params) => {
      this.generalService.getCoupon(params.id).subscribe((value: Coupon) => {
        if ((new Date(value.startDate).valueOf()) > new Date().valueOf() && !this.theCouponBelongsToTheCurrentCompany(value)) {
          this.router.navigate([this.authentication.getUrl]);
          return;
        }
        this.coupon = value;
        console.log(this.coupon);
        this.setButtons();
      });
    });
  }


  setButtons(): void {
    if (!this.user) {
      this.purchasable = true;
    } else {
      switch (this.user.clientType) {
        case ClientType.COMPANY:
          this.couponBelongToTheCompany();
          break;
        case ClientType.CUSTOMER:
          this.couponBelongToTheCustomer();
          break;
      }
    }
  }

  couponBelongToTheCompany(): void {
    this.companyService.getDetails().subscribe((value: Company) => {
      this.editable = this.coupon.companyName === value.name;
    });
  }

  couponBelongToTheCustomer(): void {
    this.customerService.loadCoupons().subscribe((values: Coupon[]) => {
      values.forEach((value: Coupon) => {
        if (value.id === this.coupon.id) {
          this.cancelable = true;
        }
      });
      this.purchasable = !this.cancelable;
    });
  }

  updateCoupon(): void {
    this.router.navigate([`${this.authentication.getUrl}/update/coupon`, this.coupon.id]);
  }

  deleteCoupon(): void {
    this.companyService.deleteCoupon(this.coupon.id).subscribe(() => {
      this.router.navigate([this.authentication.getUrl]);
    });
  }

  purchaseACoupon(): void {
    if (!this.user) {
      this.router.navigate(['sign-in']);
    } else {
      this.customerService.purchaseCoupon(this.coupon).subscribe(() => {
        this.router.navigate([this.authentication.getUrl]);
      });
    }
  }

  cancelPurchase(): void {
    this.customerService.removePurchasedCoupon(this.coupon.id).subscribe(() => {
      this.router.navigate([this.authentication.getUrl]);
    });
  }

  theCouponBelongsToTheCurrentCompany(coupon: Coupon): boolean {
    if (this.company) {
      return this.company.name === coupon.companyName;
    }
    return false;
  }

  getCompany(): void {
    if (this.user && this.user.clientType === ClientType.COMPANY) {
      this.companyService.getDetails().subscribe((value: Company) => {
        this.company = value;
      });
    }
  }

  public get user(): User {
    return this.authentication.userValue;
  }
}
