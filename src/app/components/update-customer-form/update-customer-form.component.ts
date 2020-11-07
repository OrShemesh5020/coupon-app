import { CustomerService } from './../../service/customer';
import { AdminService } from './../../service/admin';
import { Customer } from 'src/app/models/customer';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-customer-form',
  templateUrl: './update-customer-form.component.html',
  styleUrls: ['./update-customer-form.component.scss'],
})
export class UpdateCustomerFormComponent implements OnInit {
  customerModel: Customer;
  updateCustomerForm: FormGroup;

  constructor(
    private customerService: CustomerService,
    private formBuilder: FormBuilder,
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
    this.customerModel = new Customer();
    this.customerService.getCustomerDetails().subscribe((value: Customer) => {
      console.log('value:' + value);
      this.customerModel = value;
      console.log('customerModel: ' + this.customerModel.firstName);
      this.updateCustomerForm = this.formBuilder.group({
        // the '' shows the default value that the parameter would have upon init.
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
  }

  valuesImplementation(): void {
    this.customerModel.firstName = this.f.firstName.value;
    this.customerModel.lastName = this.f.lastName.value;
    this.customerModel.email = this.f.email.value;
    this.customerModel.password = this.f.password.value;
  }
  // this is a short-cut to the controls of the form
  // tslint:disable-next-line: typedef
  get f() {
    return this.updateCustomerForm.controls;
  }
}
