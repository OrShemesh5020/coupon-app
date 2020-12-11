import { Coupon } from './../../models/coupon';
import { Customer } from './../../models/customer';
import { Company } from './../../models/company';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-website-statistics',
  templateUrl: './website-statistics.component.html',
  styleUrls: ['./website-statistics.component.scss']
})
export class WebsiteStatisticsComponent implements OnInit {
  companies: Company[];
  customers: Customer[];
  coupons: Coupon[];

  constructor() { }

  ngOnInit(): void {
  }

}
