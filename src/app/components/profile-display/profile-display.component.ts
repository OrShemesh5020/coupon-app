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
        this.setDetails();
        this.setStatistics();
      });
    } else {
      this.customerService.getCustomerDetails().subscribe((value: Customer) => {
        this.customer = value;
        this.setDetails();
        this.setStatistics();
      });
    }
  }

  updateDetails(): void {
    this.router.navigate([`${this.authentication.getUrl}/update/details`]);
  }

  setStatistics(): void {
    this.getNumOfCoupons();

  }

  getNumOfCoupons(): void {
    this.getCoupons().subscribe((values: Coupon[]) => {
      this.statistics['number of coupons'] = values.length;
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

  setDetails(): void {
    if (this.company) {
      this.status['name'] = this.company.name;
      this.status['email'] = this.company.email;
      this.status['password'] = this.company.password;
    } else {
      this.status['name'] = this.customer.firstName + this.customer.lastName;
      this.status['email'] = this.customer.email;
      this.status['password'] = this.customer.password;
    }
  }

  private get user(): User {
    return this.authentication.userValue;
  }
}
