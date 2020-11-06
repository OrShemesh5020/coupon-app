import { GeneralService } from './../../service/general';
import { Router } from '@angular/router';
import { Customer } from './../../models/customer';
import {
  FormBuilder,
  FormGroup,
  PatternValidator,
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

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private generalService: GeneralService
  ) {}

  ngOnInit(): void {
    this.addCustomerForm = this.formBuilder.group({
      // the '' shows the default value that the parameter would have upon init.
      firstName: [
        this.customerModel.firstName,
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(45),
        // here i tried making the function validate that the name does not contain any numbers, but the pattern validator
        // doesnt accept a Pattern variable to validate by???
        // i need to add ['A-Za-z'] pattern to the TEMPLATE of this class
        new PatternValidator(),
      ],

      lastName: [
        this.customerModel.lastName,
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(45),
      ],

      email: [
        this.customerModel.email,
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(45),
        // this is the validator that makes sure the email is ended with .com
        Validators.pattern('.com$'),
      ],

      password: [
        this.customerModel.password,
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(45),
      ],
    });
  }
  onSubmit(): void {
    if (this.addCustomerForm.invalid) {
      return;
    }
    this.valuesImplementation();
    // what should i do here? because the functions expects no argument, but i want to update the customerModel specifically.
    this.generalService.registerCustomer(this.customerModel);
    // and here, navigate to customer -Home.
    this.router.navigate(['customerHome']);
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
    return this.addCustomerForm.controls;
  }
}
