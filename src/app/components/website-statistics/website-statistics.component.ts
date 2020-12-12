import { GeneralService } from './../../service/general';
import { AdminService } from './../../service/admin';
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
  statistics = {};

  constructor(
    private adminService: AdminService,
    private generalService: GeneralService
  ) { }

  ngOnInit(): void {
    this.getStatistics();
  }

  getStatistics(): void {
    this.getNumberOfCompanies();
    this.getNumberOfCustomers();
    this.getNumberOfCoupons();
    this.getNumberOfSales();
  }

  getNumberOfCompanies(): void {
    this.adminService.loadCompanies().subscribe((values: Company[]) => {
      this.statistics['Number of companies'] =
      {
        type: 'number',
        value: values.length
      };
    });
  }

  getNumberOfCustomers(): void {
    this.adminService.loadCustomers().subscribe((values: Customer[]) => {
      this.statistics['Number of customers'] =
      {
        type: 'number',
        value: values.length
      };
    });
  }

  getNumberOfCoupons(): void {
    this.generalService.loadCoupons().subscribe((values: Coupon[]) => {
      this.statistics['Number of coupons'] =
      {
        type: 'number',
        value: values.length
      };
    });
  }

  getNumberOfSales(): void {
    this.adminService.getTotalSales().subscribe((totalSales: number) => {
      this.statistics['The total sales'] =
      {
        type: 'number',
        value: totalSales
      };
    });
  }
}
