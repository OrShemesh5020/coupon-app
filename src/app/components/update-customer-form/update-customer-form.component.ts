import { Customer } from 'src/app/models/customer';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-customer-form',
  templateUrl: './update-customer-form.component.html',
  styleUrls: ['./update-customer-form.component.scss'],
})
export class UpdateCustomerFormComponent implements OnInit {
  updateCustomerForm: FormGroup;
  customerModel: Customer;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {}
  onSubmit() {
    if (this.updateCustomerForm.invalid) {
      return;
    }
    this.valuesImplementation();
  }
  valuesImplementation() {
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
