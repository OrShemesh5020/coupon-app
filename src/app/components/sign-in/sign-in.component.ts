import { Customer } from 'src/app/models/customer';
import { HttpResponse } from '@angular/common/http';
import { AuthenticationService } from './../../service/authentication';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { User, ClientType } from './../../models/user';
import { Component, Injectable, OnInit } from '@angular/core';
import { Coupon } from 'src/app/models/coupon';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Subject } from 'rxjs';

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
  loading = false;
  submitted = false;
  url: string;
  returnUrl: Subject<string> = new Subject();
  error: string;

  constructor(
    private authentication: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder) {
    // this.returnUrl = new BehaviorSubject(localStorage.getItem('currentUrl'));
    this.url = localStorage.getItem('currentUrl');
    if (this.authentication.userValue) {
      // console.log('userValue has a value');
      console.log(this.authentication.userValue);
      console.log('SignInComponent constructor: ' + this.url);
      this.router.navigate([this.url]);
    }
  }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit(): void {

    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.authentication.login(this.f.email.value, this.f.password.value)
      .pipe(first()).subscribe((value: User) => {
        switch (value.clientType) {
          case ClientType.ADMINISTRATOR:
            localStorage.setItem('currentUrl', 'adminHome');
            break;
          case ClientType.COMPANY:
            localStorage.setItem('currentUrl', 'companyHome');
            break;
          default:
            localStorage.setItem('currentUrl', 'customerHome');
            break;
        }
        this.url = localStorage.getItem('currentUrl');
        this.returnUrl.next(this.url);
        this.router.navigate([this.url]);
      });
  }
}
