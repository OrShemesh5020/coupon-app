import { Customer } from './../../models/customer';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-customers-view',
  templateUrl: './customers-view.component.html',
  styleUrls: ['./customers-view.component.scss']
})
export class CustomersViewComponent implements OnInit {
  @Input() customersView: Customer[];
  @Output() updateCustomer: EventEmitter<Customer> = new EventEmitter();
  @Output() deleteCustomer: EventEmitter<Customer> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onEditCustomer(customer: Customer): void {
    this.updateCustomer.emit(customer);
  }
  onDeleteCustomer(customer: Customer): void {
    this.deleteCustomer.emit(customer);
  }
}
