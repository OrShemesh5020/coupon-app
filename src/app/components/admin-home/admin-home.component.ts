import { AuthenticationService } from 'src/app/service/authentication';
import { Customer } from './../../models/customer';
import { AdminService } from './../../service/admin';
import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/company';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss'],
})
export class AdminHomeComponent implements OnInit {
  companies: Company[];
  customers: Customer[];

  constructor(private adminService: AdminService, private router: Router, private authentication: AuthenticationService) { }

  ngOnInit(): void {
    this.loadElements();
  }

  addCompany(): void {
    this.router.navigate([`${this.authentication.getUrl}/add/company`]);
  }

  updateCompany(id: number): void {
    this.router.navigate([`${this.authentication.getUrl}/update/company`, id]);
  }

  deleteCompany(id: number): void {
    this.adminService.deleteCompany(id).subscribe(() => {
      this.loadCompanies();
    });
  }

  getCompanyById(id: number): void {
    this.adminService.getCompanyById(id).subscribe((value: Company) => {
      console.log(value);
    });
  }

  getCompanyByName(name: string): void {
    this.adminService.getCompanyByName(name).subscribe((value: Company) => {
      console.log(value);
    });
  }

  addCustomer(): void {
    this.router.navigate([`${this.authentication.getUrl}/add/customer`]);
  }

  updateCustomer(id: number): void {
    this.router.navigate([`${this.authentication.getUrl}/update/customer`, id]);
  }

  deleteCustomer(id: number): void {
    this.adminService.deleteCustomer(id).subscribe(() => {
      this.loadCustomers();
    });
  }

  getCustomer(id: number): void {
    this.adminService.getCustomer(id).subscribe((value: Customer) => {
      console.log(value);
    });
  }

  loadElements(): void {
    this.loadCompanies();
    this.loadCustomers();
  }

  loadCompanies(): void {
    this.adminService.loadCompanies().subscribe((values: Company[]) => {
      this.companies = values;
      console.log(values);
    });
  }

  loadCustomers(): void {
    this.adminService.loadCustomers().subscribe((values: Customer[]) => {
      this.customers = values;
      console.log(values);
    });
  }
}
