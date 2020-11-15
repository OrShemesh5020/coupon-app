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

  constructor(private router: Router) { }

  ngOnInit(): void { }

  registerCompany(): void {
    this.router.navigate(['addCompanyForm']);
  }
  registerCustomer(): void {
    this.router.navigate(['addCustomerForm']);
  }
}
