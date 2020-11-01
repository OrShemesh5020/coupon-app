import { Customer } from './../models/customer';
import { Company } from './../models/company';
import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  changeEvent: Subject<void> = new Subject();
  addCompanyEvent: Subject<Company> = new Subject();
  getCompanyEvent: Subject<Company> = new Subject();
  companies: Company[];
  customers: Customer[];

  constructor(private httpClient: HttpClient) { }

  addCompany(company: Company): void {
    const url = 'http://localhost:8080/admin/company';
    this.httpClient.post(url, company).subscribe((value: Company) => {
      this.companies.push(value);
      this.changeEvent.next();
    });
  }

  updateCompany(company: Company): void {
    const url = 'http://localhost:8080/admin/company';
    this.httpClient.put(url, company).subscribe((value: Company) => {
      this.loadCompanies();
      this.changeEvent.next();
    });
  }

  deleteCompany(id: number): void {
    const url = `http://localhost:8080/admin/company/${id}`;
    this.httpClient.delete(url);
    this.loadCompanies();
    this.changeEvent.next();
  }
  getCompanyById(id: number): void {
    // return id < this.com.panies.length && id > -1 ? this.companies[id] : null;
    const url = `http://localhost:8080/admin/company/${id}`;
    this.httpClient.get(url).subscribe((value: Company) => {
      // this.changeEvent.next();
      this.getCompanyEvent.next(value);
    });
  }

  getCompanyByName(companyName: string): Company {
    // return id < this.companies.length && id > -1 ? this.companies[id] : null;
    const url = 'http://localhost:8080/admin/company';
    let company: Company;
    this.httpClient.get(url, {
      params: {
        name: companyName,
      }
    }).subscribe((value: Company) => {
      this.changeEvent.next();
      company = value;
    });
    return company;
  }

  loadElements(): void {
    this.loadCompanies();
    this.loadCustomers();
  }

  loadCompanies(): void {
    console.log('load companies work');
    const url = 'http://localhost:8080/admin/companies';
    this.httpClient.get(url).subscribe((values: Company[]) => {
      this.companies = values;
    });
    console.log('load companies end');
  }

  loadCustomers(): void {
    console.log('load customers work');
    const url = 'http://localhost:8080/admin/customers';
    this.httpClient.get(url).subscribe((values: Customer[]) => {
      this.customers = values;
    });
    console.log('load customers end');
  }
}
