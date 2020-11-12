import { AuthenticationService } from './../../service/authentication';
import { User, ClientType } from './../../models/user';
import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/company';
import { Customer } from 'src/app/models/customer';
import { GeneralService } from 'src/app/service/general';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  // company:Company;
  // customer:Customer;
  user: User;

  constructor(
    private generalService: GeneralService,
    private authentication: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.generalService.addCompanyEvent.subscribe((value: Company) => {
      this.user = new User(
        value.id,
        value.email,
        value.password,
        ClientType.COMPANY
      );
      localStorage.setItem('activeUser', JSON.stringify(this.user));
      this.authentication.userSubject.next(this.user);
      console.log(value);
    });
    this.generalService.addCustomerEvent.subscribe((value: Customer) => {
      this.user = new User(
        value.id,
        value.email,
        value.password,
        ClientType.CUSTOMER
      );
      localStorage.setItem('activeUser', JSON.stringify(this.user));
      console.log(value);
    });
  }
  registerCompany(): void {
    this.router.navigate(['addCompanyForm']);
  }
  registerCustomer(): void {
    this.router.navigate(['addCustomerForm']);
  }
}
