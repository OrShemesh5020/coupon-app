import { Company } from './../../models/company';
import { AuthenticationService } from 'src/app/service/authentication';
import { Customer } from './../../models/customer';
import { AdminService } from './../../service/admin';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss'],
})
export class AdminHomeComponent implements OnInit {
  companies: Company[];
  customers: Customer[];
  displayCompanies = true;
  buttonText = 'show all customers';

  constructor(private adminService: AdminService, private router: Router, private authentication: AuthenticationService) { }

  ngOnInit(): void {
    this.loadElements();
  }

  addCompany(): void {
    this.router.navigate([`${this.authentication.getUrl}/add/company`]);
  }

  updateCompany(company: Company): void {
    this.router.navigate([`${this.authentication.getUrl}/update/company`, company.id]);
  }

  deleteCompany(company: Company): void {
    this.adminService.deleteCompany(company.id).subscribe(() => {
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

  updateCustomer(customer: Customer): void {
    this.router.navigate([`${this.authentication.getUrl}/update/customer`, customer.id]);
  }

  deleteCustomer(customer: Customer): void {
    this.adminService.deleteCustomer(customer.id).subscribe(() => {
      this.loadCustomers();
    });
  }

  getCustomer(id: number): void {
    this.adminService.getCustomer(id).subscribe((value: Customer) => {
      console.log(value);
    });
  }

  switchDisplay(): void {
    this.displayCompanies = !this.displayCompanies;
    if (this.displayCompanies) {
      this.buttonText = 'show all customers';
    } else {
      this.buttonText = 'show all companies';
    }
  }

  loadElements(): void {
    this.loadCompanies();
    this.loadCustomers();
  }

  loadCompanies(): void {
    this.adminService.loadCompanies().subscribe((values: Company[]) => {
      this.companies = values;
    });
  }

  loadCustomers(): void {
    this.adminService.loadCustomers().subscribe((values: Customer[]) => {
      this.customers = values;
    });
  }
}
