import { Observable } from 'rxjs';
import { ClientType, User } from './../../models/user';
import { CustomerService } from './../../service/customer';
import { AdminService } from './../../service/admin';
import { Customer } from 'src/app/models/customer';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/authentication';

@Component({
  selector: 'app-update-customer-form',
  templateUrl: './update-customer-form.component.html',
  styleUrls: ['./update-customer-form.component.scss'],
})
export class UpdateCustomerFormComponent implements OnInit {
  customerModel: Customer;
  updateCustomerForm: FormGroup;
  loading = true;
  constructor(
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute,
    private authentication: AuthenticationService,
    private customerService: CustomerService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.customerModel = new Customer();
      this.getModel(params.id).subscribe((value: Customer) => {
        this.customerModel = value;
        this.initializeFormGroup();
      });
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.updateCustomerForm.invalid) {
      return;
    }
    this.valuesImplementation();
    if (this.user.clientType === ClientType.ADMINISTRATOR) {
      this.adminService.updateCustomer(this.customerModel).subscribe(() => {
        this.router.navigate([this.authentication.getUrl]);
      });
      return;
    }
    this.customerService
      .updateCustomerDetails(this.customerModel)
      .subscribe(() => {
        this.router.navigate([this.authentication.getUrl]);
      });
  }

  valuesImplementation(): void {
    this.customerModel.firstName = this.getter.firstName.value;
    this.customerModel.lastName = this.getter.lastName.value;
    this.customerModel.email = this.getter.email.value;
    this.customerModel.password = this.getter.password.value;
  }
  private get getter() {
    return this.updateCustomerForm.controls;
  }
  private get user(): User {
    return this.authentication.userValue;
  }

  private getModel(id: number): Observable<Customer> {
    if (this.authentication.userValue.clientType === ClientType.CUSTOMER) {
      return this.customerService.getCustomerDetails();
    }
    return this.adminService.getCustomer(id);
  }
  private initializeFormGroup(): void {
    this.updateCustomerForm = this.formBuilder.group({
      firstName: [
        this.customerModel.firstName,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(45),
        ],
      ],

      lastName: [
        this.customerModel.lastName,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(45),
        ],
      ],

      email: [
        this.customerModel.email,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(45),
        ],
      ],

      password: [
        this.customerModel.password,
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(45),
        ],
      ],
    });
    this.loading = false;
  }
}
