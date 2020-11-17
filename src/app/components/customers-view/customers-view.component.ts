import { Customer } from './../../models/customer';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-customers-view',
  templateUrl: './customers-view.component.html',
  styleUrls: ['./customers-view.component.scss']
})
export class CustomersViewComponent implements OnInit {
  @Input() customers: Customer[];
  constructor() { }

  ngOnInit(): void {
  }

}
