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
  loginEvent: Subject<User> = new Subject();
  addCompanyEvent: Subject<Company> = new Subject();
  addCustomerEvent: Subject<Customer> = new Subject();
  loadCouponsEvent: Subject<Coupon[]> = new Subject();
  constructor(private httpClient: HttpClient) {
    console.log('GeneralService constructor');
  }

  login(clientType: string, mail: string, pass: string): void {
    console.log(
      'clientType: ' + clientType + ', email: ' + mail + ', password: ' + pass
    );
    const url = 'http://localhost:8080/general/login';
    this.httpClient
      .get<User>(url, {
        params: {
          type: clientType,
          email: mail,
          password: pass,
        },
        observe: 'response'
      })
      .subscribe((res) => {
        // this.user.token = res.headers.get('token');
        // console.log(res.headers.get('token'));
        // console.log(res.body);
        const user = new User(res.body.id, res.body.email, res.body.password, res.body.clientType);
        user.token = res.headers.get('token');
        console.log(user);
        this.loginEvent.next(user);
        // this.user = value;
        // console.log('login function value: ' + value);
        // console.log('login function user: ' + this.user);
        // // this.user.token=
        // this.loginEvent.next(value);
      });
  }

  loadCoupons(): void {
    const url = 'http://localhost:8080/general/coupons';
    this.httpClient.get(url).subscribe((values: Coupon[]) => {
      this.loadCouponsEvent.next(values);
    });
  }

  registerCompany(company: Company): void {
    const url = 'http://localhost:8080/general/company';
    this.httpClient.post(url, company).subscribe((value: Company) => {
      this.addCompanyEvent.next(value);
    });
  }
  registerCustomer(customer: Customer): void {
    const url = 'http://localhost:8080/general/customer';
    this.httpClient.post(url, customer).subscribe((value: Customer) => {
      this.addCustomerEvent.next(value);
    });
  }

  getConfigResponse(url: string): Observable<HttpResponse<Config>> {
    return null;
  }
}
