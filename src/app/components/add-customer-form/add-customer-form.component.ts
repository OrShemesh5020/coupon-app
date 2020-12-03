import { AdminService } from './../../service/admin';
import { User, ClientType } from './../../models/user';
import { AuthenticationService } from './../../service/authentication';
import { GeneralService } from './../../service/general';
import { Router } from '@angular/router';
import { Customer } from './../../models/customer';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-customer-form',
  templateUrl: './add-customer-form.component.html',
  styleUrls: ['./add-customer-form.component.scss'],
})
export class AddCustomerFormComponent implements OnInit {
  addCustomerForm: FormGroup;
  customerModel: Customer;
  buttonText: string;

  constructor(
    private authentication: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private generalService: GeneralService,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.buttonText = !this.user ? 'register' : 'add customer';
    this.customerModel = new Customer();
    this.addCustomerForm = this.formBuilder.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(45),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(45),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(45),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(45),
        ],
      ],
      confirmPassword:
        ['',
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(45)
          ]
        ],
    });
  }
  onSubmit(): void {
    if (this.addCustomerForm.invalid) {
      return;
    }
    if (!this.thePasswordsMatch()) {
      console.log('the passwords do not match!');
      return;
    }
    this.valuesImplementation();
    if (!this.user) {
      this.generalService
        .registerCustomer(this.customerModel)
        .subscribe(() => {
          this.authentication
            .login(this.customerModel.email, this.customerModel.password)
            .subscribe(() => {
              this.router.navigate([this.authentication.getUrl]);
            });
        });
    } else if (
      this.user.clientType === ClientType.ADMINISTRATOR
    ) {
      this.adminService
        .addCustomer(this.customerModel)
        .subscribe(() => {
          this.router.navigate([this.authentication.getUrl]);
        });
    }
  }

  thePasswordsMatch(): boolean {
    const password = this.getter.password.value;
    const confirmPassword = this.getter.confirmPassword.value;
    return password === confirmPassword;
  }

  valuesImplementation(): void {
    this.customerModel.firstName = this.getter.firstName.value;
    this.customerModel.lastName = this.getter.lastName.value;
    this.customerModel.email = this.getter.email.value;
    this.customerModel.password = this.getter.password.value;
  }
  get getter() {
    return this.addCustomerForm.controls;
  }

  private get user(): User {
    return this.authentication.userValue;
  }
}
