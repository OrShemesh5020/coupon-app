import { AuthenticationService } from 'src/app/service/authentication';
import { User } from './../../models/user';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  user: User;

  constructor(private router: Router, private authentication: AuthenticationService) {
    if (this.authentication.userValue) {
      this.router.navigate([this.authentication.getUrl]);
      return;
    }
  }

  ngOnInit(): void { }

  registerCompany(): void {
    this.router.navigate(['addCompanyForm']);
  }
  registerCustomer(): void {
    this.router.navigate(['addCustomerForm']);
  }
}
