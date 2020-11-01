import { AuthenticationService } from './../../service/authentication';
import { User, ClientType } from './../../models/user';
import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/company';
import { Customer } from 'src/app/models/customer';
import { GeneralService } from 'src/app/service/general';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  // company:Company;
  // customer:Customer;
  user: User;
  constructor(private generalService: GeneralService, private authentication: AuthenticationService) { }

  ngOnInit(): void {
    this.generalService.addCompanyEvent.subscribe((value: Company) => {
      this.user = new User(value.id, value.email, value.password, ClientType.COMPANY);
      localStorage.setItem('activeUser', JSON.stringify(this.user));
      this.authentication.userSubject.next(this.user);
      console.log(value);
    });
    this.generalService.addCustomerEvent.subscribe((value: Customer) => {
      this.user = new User(value.id, value.email, value.password, ClientType.CUSTOMER);
      localStorage.setItem('activeUser', JSON.stringify(this.user));
      console.log(value);
    })
  }
  registerCompany(name: string, email: string, password: string): void {
    const company = new Company(name, email, password);
    this.generalService.registerCompany(company);
  }
  registerCustomer(firstName: string, lastName: string, email: string, password: string): void {
    const customer = new Customer(firstName, lastName, email, password);
    this.generalService.registerCustomer(customer);
  }
}
