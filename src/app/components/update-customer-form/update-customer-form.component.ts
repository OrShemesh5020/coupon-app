import { Observable } from 'rxjs';
import { ClientType } from './../../models/user';
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
  constructor(
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute,
    private authentication: AuthenticationService,
    private customerService: CustomerService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    // need to review this piece of code, i used it so the updateForm can initialize
    // the values, because otherwise the console gives the error:
    // core.js:4197 ERROR Error: formGroup expects a FormGroup instance. Please pass one in.
    this.updateCustomerForm = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  ngOnInit(): void {
    if (
      !this.authentication.userValue ||
      this.authentication.userValue.clientType === ClientType.COMPANY
    ) {
      this.router.navigate(['log-out']);
      return;
    }
    this.activatedRoute.params.subscribe((params) => {
      console.log('this users id :' + this.user.id);
      console.log('this params id : ' + params.id);

      if (
        this.user.clientType === ClientType.CUSTOMER &&
        this.user.id != params.id
      ) {
        this.router.navigate(['log-out']);
        return;
      }
      this.getModel(params.id).subscribe((value: Customer) => {
        this.customerModel = value;
        this.valuesImplementation();
      });
    });
    this.customerModel = new Customer();
    this.customerService.getCustomerDetails().subscribe((value: Customer) => {
      console.log('value:' + value);
      this.customerModel = value;
      console.log('customerModel: ' + this.customerModel.firstName);
      this.updateCustomerForm = this.formBuilder.group({
        firstName: [
          this.customerModel.firstName,
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(45),
          ], // here i tried making the function validate that the name does not contain any numbers, but the pattern validator
          // doesnt accept a Pattern variable to validate by???
          // i need to add ['A-Za-z'] pattern to the TEMPLATE of this class
          // new PatternValidator(),
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
    });
  }

  onSubmit(): void {
    if (this.updateCustomerForm.invalid) {
      return;
    }
    this.valuesImplementation();
    this.customerService
      .updateCustomerDetails(this.customerModel)
      .subscribe((value: Customer) => {
        console.log('value: ' + value);
        this.router.navigate(['customerHome']);
      });
  }

  valuesImplementation(): void {
    this.customerModel.firstName = this.getter.firstName.value;
    this.customerModel.lastName = this.getter.lastName.value;
    this.customerModel.email = this.getter.email.value;
    this.customerModel.password = this.getter.password.value;
  }
  // this is a short-cut to the controls of the form
  // tslint:disable-next-line: typedef
  private get getter() {
    return this.updateCustomerForm.controls;
  }
  private get user() {
    return this.authentication.userValue;
  }

  private getModel(id: number): Observable<Customer> {
    if (this.authentication.userValue.clientType === ClientType.CUSTOMER) {
      console.log('geting model from customer service');
      return this.customerService.getCustomerDetails();
    }
    console.log('geting model from admin service');
    return this.adminService.getCustomer(id);
  }
}
