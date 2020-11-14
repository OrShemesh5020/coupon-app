import { AuthenticationService } from './../../service/authentication';
import { Router } from '@angular/router';
import { User } from './../../models/user';
import { Component, Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    private formBuilder: FormBuilder) {
    if (this.authentication.userValue) {
      this.router.navigate([this.authentication.getUrl]);
    }
  }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  get getter() {
    return this.loginForm.controls;
  }

  onSubmit(): void {

    if (this.loginForm.invalid) {
      return;
    }
    this.authentication.login(this.getter.email.value, this.getter.password.value).subscribe((value: User) => {
      this.router.navigate([this.authentication.getUrl]);
    });
  }
}
