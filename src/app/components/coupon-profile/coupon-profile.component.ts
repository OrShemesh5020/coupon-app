import { CustomerService } from './../../service/customer';
import { CompanyService } from './../../service/company';
import { GeneralService } from './../../service/general';
import { ClientType, User } from './../../models/user';
import { AuthenticationService } from './../../service/authentication';
import { Observable } from 'rxjs';
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
  constructor(
    private activatedRoute: ActivatedRoute,
    private authentication: AuthenticationService,
    private router: Router,
    private generalService: GeneralService,
    private companyService: CompanyService,
    private customerService: CustomerService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.getModel(params.id).subscribe((value: Coupon) => {
        this.coupon = value;
        console.log(this.coupon);
      });
    });
  }

  getModel(id: number): Observable<Coupon> {
    if (this.user) {
      switch (this.user.clientType) {
        case ClientType.COMPANY:
          return this.companyService.getCouponById(id);
        case ClientType.CUSTOMER:
          return this.customerService.getCoupon(id);
      }
    }
    return this.generalService.getCoupon(id);

  }

  private get user(): User {
    return this.authentication.userValue;
  }
}
