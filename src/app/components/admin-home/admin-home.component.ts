import { Router } from '@angular/router';
import { routes } from './../../app.routes';
import { Customer } from './../../models/customer';
import { AdminService } from './../../service/admin';
import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/company';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss'],
})
export class AdminHomeComponent implements OnInit {
  companies: Company[];
  customers: Customer[];

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit(): void {
    this.loadElements();
  }

  addCompany(name: string, email: string, password: string): void {
    const comapny = new Company(name, email, password);
    this.adminService.addCompany(comapny).subscribe((value: Company) => {
      console.log(value);
      this.loadCompanies();
    });
  }

  updateCompany(
    id: number,
    name: string,
    email: string,
    password: string
  ): void {
    const comapny = new Company(name, email, password, id);
    this.adminService.updateCompany(comapny).subscribe((value: Company) => {
      console.log(value);
      this.loadCompanies();
    });
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
    this.router.navigate(['addCustomerForm']);
    this.loadCustomers();
  }

  updateCustomer(
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): void {
    const customer = new Customer(firstName, lastName, email, password, id);
    this.adminService.updateCustomer(customer).subscribe((value: Customer) => {
      console.log(value);
      this.loadCustomers();
    });
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
