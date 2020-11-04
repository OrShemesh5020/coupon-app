import { Customer } from './../models/customer';
import { Company } from './../models/company';
import { Injectable, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  // changeEvent: Subject<void> = new Subject();
  // addCompanyEvent: Subject<Company> = new Subject();
  // getCompanyEvent: Subject<Company> = new Subject();
  // companies: Company[];
  // customers: Customer[];

  constructor(private httpClient: HttpClient) { }

  addCompany(company: Company): Observable<Company> {
    const url = 'http://localhost:8080/admin/company';
    return this.httpClient.post<Company>(url, company);
  }

  updateCompany(company: Company): Observable<Company> {
    const url = 'http://localhost:8080/admin/company';
    return this.httpClient.put<Company>(url, company);
  }

  deleteCompany(id: number): void {
    const url = `http://localhost:8080/admin/company/${id}`;
    this.httpClient.delete(url);
  }
  getCompanyById(id: number): Observable<Company> {
    const url = `http://localhost:8080/admin/company/${id}`;
    return this.httpClient.get<Company>(url);
  }

  getCompanyByName(companyName: string): Observable<Company> {
    const url = 'http://localhost:8080/admin/company';
    return this.httpClient.get<Company>(url, {
      params: {
        name: companyName,
      }
    });
  }

  // loadElements(): void {
  //   this.loadCompanies();
  //   this.loadCustomers();
  // }

  loadCompanies(): Observable<Company[]> {
    const url = 'http://localhost:8080/admin/companies';
    return this.httpClient.get<Company[]>(url);
  }

  loadCustomers(): Observable<Customer[]> {
    const url = 'http://localhost:8080/admin/customers';
    return this.httpClient.get<Customer[]>(url);
  }
}
