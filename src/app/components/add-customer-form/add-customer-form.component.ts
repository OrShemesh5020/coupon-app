import { CustomerService } from './../../service/customer';
import { Customer } from './../../models/customer';
import { EmailValidator, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-customer-form',
  templateUrl: './add-customer-form.component.html',
  styleUrls: ['./add-customer-form.component.scss'],
})
export class AddCustomerFormComponent implements OnInit {
  addCustomerForm: FormGroup;
  customerService: CustomerService;
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
    onSubmit(): void{
      this.valuesImplementation();
      // what should i do here? because the functions expects no argument, but i want to update the customerModel specifically.
      //this.customerService.updateCustomerDetails(this.customerModel);

      // and here, do i want to navigate to admin-HOme? because the admin submits the addCustomer form.
      //this.routed.navigate(['admin/admin-home']);

    }

    valuesImplementation(): void {
      this.customerModel.firstName = this.addCustomerForm.value.firstName;
      this.customerModel.lastName = this.addCustomerForm.value.lastName;
      this.customerModel.email = this.addCustomerForm.value.email;
      this.customerModel.password = this.addCustomerForm.value.password;

    }
}
