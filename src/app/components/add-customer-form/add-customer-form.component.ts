import { Customer } from './../../models/customer';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-customer-form',
  templateUrl: './add-customer-form.component.html',
  styleUrls: ['./add-customer-form.component.scss'],
})
export class AddCustomerFormComponent implements OnInit {
  addCustomerForm: FormGroup;
  constructor(private formBuilder: FormBuilder) {}
  customerModel: Customer;

  ngOnInit(): void {
    this.addCustomerForm = this.formBuilder.group({
      // the '' shows the default value that the parameter would have upon init.
      firstName: [
        this.customerModel.firstName,
         Validators.required,
         Validators.minLength(2),
         Validators.maxLength(10),

      ],

        lastName: [
        this.customerModel.lastName,
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(15),

      ],

      email: [
        this.customerModel.email,
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(20),
          //this is the validator that makes sure the email is ended with .com
        Validators.pattern('.com$'),
      ],

      password: [
        this.customerModel.password,
         Validators.required,
         Validators.minLength(5),
         Validators.maxLength(20),
      ],
    });
  }

}
