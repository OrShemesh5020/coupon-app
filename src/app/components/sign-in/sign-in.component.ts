import { CustomerService } from './../../service/customer';
import { CompanyService } from './../../service/company';
import { ClientType } from 'src/app/models/user';
import { User } from './../../models/user';
import { AlertService } from './../../service/alert';
import { AuthenticationService } from './../../service/authentication';
import { Router } from '@angular/router';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Company } from 'src/app/models/company';
import { Customer } from 'src/app/models/customer';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
@Injectable({
  providedIn: 'root',
})
export class SignInComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private authentication: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ,
    private companyService: CompanyService,
    private customerService: CustomerService) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(45)
        ]
      ],
      password: ['',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(45)
        ]
      ],
    });
  }

  get getter() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }
    this.authentication.login(this.getter.email.value, this.getter.password.value).subscribe(() => {
      this.printWelcome();
      this.router.navigate([this.authentication.getUrl]);
    });
  }


  printWelcome(): void {
    if (this.user.clientType === ClientType.COMPANY) {
      this.companyService.getDetails().subscribe((value: Company) => {
        this.alertService.success(`welcome ${value.name}`);
      });
    } else if (this.user.clientType === ClientType.CUSTOMER) {
      this.customerService.getCustomerDetails().subscribe((value: Customer) => {
        this.alertService.success(`welcome ${value.firstName + ' ' + value.lastName}`);
      });
    } else {
      this.alertService.success('welcome admin', true);
    }
  }

  registerCompany(): void {
    this.router.navigate([`${this.authentication.getUrl}/sign-up/company`]);
  }
  registerCustomer(): void {
    this.router.navigate([`${this.authentication.getUrl}/sign-up/customer`]);
  }

  private get user(): User {
    return this.authentication.userValue;
  }
}
