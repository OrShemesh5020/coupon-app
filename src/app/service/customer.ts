import { Customer } from 'src/app/models/customer';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Coupon } from './../models/coupon';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private httpClient: HttpClient) { }

  purchaseCoupon(coupon: Coupon): Observable<Coupon> {
    const url = 'http://localhost:8080/customer/coupon';
    return this.httpClient.post<Coupon>(url, coupon);
  }
  // here i changed what the function received from "coupon" to "couponId" because the url required an id.
  removePurchasedCoupon(couponId: number): Observable<void> {
    console.log('im in the removepurchasecoupon service');
    const url = `http://localhost:8080/customer/coupon/${couponId}`;
    return this.httpClient.delete<void>(url);

  }

  getCoupon(id: number): Observable<Coupon> {
    const url = `http://localhost:8080/customer/coupon/${id}`;
    return this.httpClient.get<Coupon>(url);
  }

  getCustomerCouponsByCategory(categoryName: string): Observable<Coupon[]> {
    const url = `http://localhost:8080/customer/coupons/categoryId/${categoryName}`;
    return this.httpClient.get<Coupon[]>(url);
  }

  getCustomerCouponsByPrice(price: number): Observable<Coupon[]> {
    const url = `http://localhost:8080/customer/coupons/price/${price}`;
    return this.httpClient.get<Coupon[]>(url);
  }
  loadCoupons(): Observable<Coupon[]> {
    const url = 'http://localhost:8080/customer/coupons';
    return this.httpClient.get<Coupon[]>(url);
  }
  getCustomerDetails(): Observable<Customer> {
    const url = `http://localhost:8080/customer/details`;
    return this.httpClient.get<Customer>(url);
  }
  updateCustomerDetails(customer: Customer): Observable<Customer> {
    const url = `http://localhost:8080/customer/details`;
    return this.httpClient.put<Customer>(url, customer);
  }
}
