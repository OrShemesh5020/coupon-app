import { Config } from './../models/config';
import { Customer } from './../models/customer';
import { Company } from './../models/company';
import { Coupon } from './../models/coupon';
import { Subject, Observable } from 'rxjs';
import { User } from './../models/user';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class GeneralService {

  constructor(private httpClient: HttpClient) { }

  loadCoupons(): Observable<Coupon[]> {
    const url = 'http://localhost:8080/general/coupons';
    return this.httpClient.get<Coupon[]>(url);
  }

  getCoupon(id: number): Observable<Coupon> {
    const url = `http://localhost:8080/general/coupon/${id}`;
    return this.httpClient.get<Coupon>(url);
  }

  registerCompany(company: Company): Observable<Company> {
    const url = 'http://localhost:8080/general/company';
    return this.httpClient.post<Company>(url, company);
  }
  registerCustomer(customer: Customer): Observable<Customer> {
    const url = 'http://localhost:8080/general/customer';
    return this.httpClient.post<Customer>(url, customer);
  }
}
