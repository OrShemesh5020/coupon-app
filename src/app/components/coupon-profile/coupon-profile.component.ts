import { AlertService } from './../../service/alert';
import { ConfirmationDialog } from './../../service/confirmation-dialog';
import { Company } from './../../models/company';
import { CustomerService } from './../../service/customer';
import { CompanyService } from './../../service/company';
import { GeneralService } from './../../service/general';
import { ClientType, User } from './../../models/user';
import { AuthenticationService } from './../../service/authentication';
import { Coupon } from './../../models/coupon';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

const ONE_HOUR = 60 * 60;
const ONE_DAY = ONE_HOUR * 24;
const ONE_WEEK = ONE_DAY * 7;

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
  isDealExpired = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authentication: AuthenticationService,
    private router: Router,
    private generalService: GeneralService,
    private companyService: CompanyService,
    private customerService: CustomerService,
    private alertService: AlertService,
    private confirmationDialog: ConfirmationDialog
  ) { }

  ngOnInit(): void {
    this.getCompany();
    this.activatedRoute.params.subscribe((params) => {
      this.generalService.getCoupon(params.id).subscribe((value: Coupon) => {
        const now = new Date().getTime();
        const endDate = new Date(value.endDate).getTime();
        const isCouponExpired = endDate - now <= 0;
        if (isCouponExpired && !this.theCouponBelongsToTheCurrentCompany(value)) {
          this.isDealExpired = true;
        }

        if ((new Date(value.startDate).valueOf()) > new Date().valueOf() && !this.theCouponBelongsToTheCurrentCompany(value)) {
          this.printlaunchDate(value);
          this.router.navigate([this.authentication.getUrl]);
          return;
        }
        this.coupon = value;
        this.setButtons();
      });
    });
  }

  printlaunchDate(coupon: Coupon): void {
    var date = new Date(coupon.startDate);
    this.alertService.error(`This coupon will be launched on ${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`, true);
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
    this.confirmationDialog.confirm(
      'Delete coupon alert',
      'Are you sure you want to delete this coupon?',
      'Delete'
    ).then((confirmed: boolean) => {
      if (confirmed) {
        this.companyService.deleteCoupon(this.coupon.id).subscribe(() => {
          this.alertService.success('coupon successfully deleted', true); this.router.navigate([this.authentication.getUrl]);
        });
      }
    });
  }

  purchaseACoupon(): void {
    if (!this.user) {
      this.router.navigate(['sign-in']);
    } else {
      this.customerService.purchaseCoupon(this.coupon).subscribe(() => {
        this.alertService.success('coupon successfully purchased', true);
        this.router.navigate([this.authentication.getUrl]);
      });
    }
  }

  cancelPurchase(): void {
    this.confirmationDialog.confirm(
      'Purchased coupon removal',
      'Are you sure you want to remove this coupon?',
      'Remove'
    ).then((confirmed: boolean) => {
      if (confirmed) {
        this.customerService.removePurchasedCoupon(this.coupon.id).subscribe(() => {
          this.alertService.success('coupon successfully canceled', true); this.router.navigate([this.authentication.getUrl]);
        });
      }
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

  getTimeLeftTillDate(date: Date): any {
    const now = new Date().getTime();
    const timestamp = new Date(date).getTime();

    const inSeconds = Math.round((timestamp - now) / 1000);
    const inWeeks = Math.round(inSeconds / ONE_WEEK);
    const inDays = Math.round(inSeconds / ONE_DAY);
    const inHours = Math.round(inSeconds / ONE_HOUR);

    return {
      inSeconds,
      inWeeks,
      inDays,
      inHours,
      unit:
        inWeeks > 0 ? 'week' :
          inDays > 0 ? 'day' :
            inHours > 0 ? 'hour' :
              'second'
    };
  }

  getTimeTillDateMessage(date: Date): string {
    const diff = this.getTimeLeftTillDate(date);
    const remainAmount = diff.inWeeks || diff.inDays || diff.inHours || diff.inSeconds;
    const unit = diff.unit.toUpperCase();

    if (diff.inSeconds <= ONE_HOUR && diff.inSeconds > 0) {
      return 'THE DEAL WILL EXPIRE ANY MOMENT NOW!';
    }

    if (diff.inSeconds <= 0) {
      return '...BUT THIS DEAL JUST EXPIRED!';
    }

    return `ONLY ${remainAmount} ${remainAmount > 1 ? `${unit}S` : unit} LEFT!`;
  }

  getIsDealExpired(): boolean {
    return this.isDealExpired;
  }

  scrollToBottom(): void {
    document
      .getElementById('app-wrapper')
      .scrollTo({ top: window.innerHeight });
  }
}
