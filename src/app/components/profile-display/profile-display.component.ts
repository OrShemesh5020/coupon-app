import { Observable } from 'rxjs';
import { Coupon } from './../../models/coupon';
import { Router } from '@angular/router';
import { ClientType, User } from './../../models/user';
import { AuthenticationService } from './../../service/authentication';
import { CustomerService } from './../../service/customer';
import { Customer } from './../../models/customer';
import { CompanyService } from './../../service/company';
import { Company } from './../../models/company';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-display',
  templateUrl: './profile-display.component.html',
  styleUrls: ['./profile-display.component.scss']
})
export class ProfileDisplayComponent implements OnInit {
  company: Company;
  customer: Customer;
  status = {};
  statistics = {};
  constructor(
    private authentication: AuthenticationService,
    private companyService: CompanyService,
    private customerService: CustomerService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.user.clientType === ClientType.COMPANY) {
      this.companyService.getDetails().subscribe((value: Company) => {
        this.company = value;
        this.setStatus();
        this.getStatistics();
      });
    } else {
      this.customerService.getCustomerDetails().subscribe((value: Customer) => {
        this.customer = value;
        this.setStatus();
        this.getStatistics();
      });
    }
  }

  updateDetails(): void {
    this.router.navigate([`${this.authentication.getUrl}/update/details`]);
  }

  getStatistics(): void {
    this.getNumOfCoupons();
    this.getTotalMoney();
  }

  getNumOfCoupons(): void {
    this.getCoupons().subscribe((values: Coupon[]) => {
      this.statistics['Number of coupons'] =
      {
        type: 'number',
        value: values.length
      };
    });
  }

  getTotalMoney() {
    let totalMoney = 0;
    this.getCoupons().subscribe((values: Coupon[]) => {
      if (this.company) {
        console.log('company');
        values.forEach((value: Coupon) => {
          totalMoney += (value.amount * value.price);
        });
        this.statistics['Total price of coupons left'] =
        {
          type: 'price',
          value: totalMoney
        };
      } else {
        console.log('customer');
        values.forEach((value: Coupon) => {
          totalMoney += value.price;
        });
        this.statistics['Total coupons price'] =
        {
          type: 'price',
          value: totalMoney
        };
      }
    });
  }

  getCoupons(): Observable<Coupon[]> {
    if (this.user.clientType === ClientType.COMPANY) {
      return this.companyService.loadCoupons();
    }
    return this.customerService.loadCoupons();
  }

  getDetailsKeys(object) {
    return Object.keys(object);
  }

  setStatus(): void {
    if (this.company) {
      this.status['name'] = this.company.name;
      this.status['email'] = this.company.email;
      this.status['password'] = this.getHiddenPassword(this.company.password.length);
    } else {
      this.status['name'] = this.customer.firstName + ' ' + this.customer.lastName;
      this.status['email'] = this.customer.email;
      this.status['password'] = this.getHiddenPassword(this.customer.password.length);
    }
  }

  getHiddenPassword(passLength: number): string {
    let hiddenPassword = '';
    for (let index = 0; index < passLength; index++) {
      hiddenPassword += '*';
    }
    return hiddenPassword;
  }

  private get user(): User {
    return this.authentication.userValue;
  }
}
