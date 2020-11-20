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
      });
    } else {
      this.customerService.getCustomerDetails().subscribe((value: Customer) => {
        this.customer = value;
      });
    }
  }

  updateDetails(): void {
    this.router.navigate([`${this.authentication.getUrl}/update/details`]);
  }

  private get user(): User {
    return this.authentication.userValue;
  }
}
