import { Customer } from './../models/customer';
import { Company } from './../models/company';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdminService {

  constructor(private httpClient: HttpClient) { }

  addCompany(company: Company): Observable<Company> {
    const url = 'http://localhost:8080/admin/company';
    return this.httpClient.post<Company>(url, company);
  }

  updateCompany(company: Company): Observable<Company> {
    const url = 'http://localhost:8080/admin/company';
    return this.httpClient.put<Company>(url, company);
  }

  deleteCompany(id: number): Observable<void> {
    const url = `http://localhost:8080/admin/company/${id}`;
    return this.httpClient.delete<void>(url);
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

  addCustomer(customer: Customer): Observable<Customer> {
    const url = 'http://localhost:8080/admin/customer';
    return this.httpClient.post<Customer>(url, customer);
  }

  updateCustomer(customer: Customer): Observable<Customer> {
    const url = 'http://localhost:8080/admin/customer';
    return this.httpClient.put<Customer>(url, customer);
  }

  deleteCustomer(id: number): Observable<void> {
    const url = `http://localhost:8080/admin/customer/${id}`;
    return this.httpClient.delete<void>(url);
  }

  getCustomer(customerId: number): Observable<Customer> {
    const url = 'http://localhost:8080/admin/customer';
    return this.httpClient.get<Customer>(url, {
      params: {
        id: customerId.toString(),
      }
    });
  }

  loadCompanies(): Observable<Company[]> {
    const url = 'http://localhost:8080/admin/companies';
    return this.httpClient.get<Company[]>(url);
  }

  loadCustomers(): Observable<Customer[]> {
    const url = 'http://localhost:8080/admin/customers';
    return this.httpClient.get<Customer[]>(url);
  }
}
