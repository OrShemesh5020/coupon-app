import { Customer } from './../../models/customer';
import { AdminService } from './../../service/admin';
import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/company';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {
  companies: Company[];
  customers: Customer[];

  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {
    this.loadElements();
  }


  addCompany(): void {
    this.router.navigate(['addCompanyForm']);
  }

  updateCompany(id: number): void {
    this.router.navigate(['updateCompanyForm', id]);
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

  addCustomer(firstName: string, lastName: string, email: string, password: string): void {
    const customer = new Customer(firstName, lastName, email, password);
    this.adminService.addCustomer(customer).subscribe((value: Customer) => {
      console.log(value);
      this.loadCustomrs();
    });
  }

  updateCustomer(id: number, firstName: string, lastName: string, email: string, password: string): void {
    const customer = new Customer(firstName, lastName, email, password, id);
    this.adminService.updateCustomer(customer).subscribe((value: Customer) => {
      console.log(value);
      this.loadCustomrs();
    });
  }

  deleteCustomer(id: number): void {
    this.adminService.deleteCustomer(id).subscribe(() => {
      this.loadCustomrs();
    });
  }

  getCustomer(id: number): void {
    this.adminService.getCustomer(id).subscribe((value: Customer) => {
      console.log(value);
    });
  }

  loadElements(): void {
    this.loadCompanies();
    this.loadCustomrs();
  }

  loadCompanies(): void {
    this.adminService.loadCompanies().subscribe((values: Company[]) => {
      this.companies = values;
      console.log(values);
    });
  }

  loadCustomrs(): void {
    this.adminService.loadCustomers().subscribe((values: Customer[]) => {
      this.customers = values;
      console.log(values);
    });
  }
}
