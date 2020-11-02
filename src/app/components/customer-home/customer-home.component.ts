import { Customer } from 'src/app/models/customer';
import { CustomerService } from './../../service/customer';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-home',
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.scss']
})
export class CustomerHomeComponent implements OnInit {
  customer: Customer;

  constructor(private customerService: CustomerService) { }

  ngOnInit(): void {
    this.getDetails();
  }

  getDetails() {
    this.customerService.getCustomerDetails().subscribe((value: Customer)=>{
      this.customer = value;
    })
  }

}
