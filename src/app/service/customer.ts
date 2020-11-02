import { Customer } from 'src/app/models/customer';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Coupon } from './../models/coupon';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private httpClient: HttpClient) {}

  purchaseCoupon(coupon: Coupon): void {
    const url = 'http://localhost:8080/customer/coupon';
    this.httpClient.post(url, coupon).subscribe((value: Coupon) => {
      this.loadCoupons();
    });
  }
  removePurchasedCoupon(coupon: Coupon): void {
    const url =`http://localhost:8080/customer/coupon/${id}`;
    this.httpClient.delete(url);
    this.loadCoupons();
  }

  getCoupon(id: number): Observable<Coupon> {
    const url = `http://localhost:8080/customer/coupon${id}`;
    return this.httpClient.get<Coupon>(url);
  }

  getCustomerCouponsByCategory(categoryId: number): Observable<Coupon[]> {
    const url = `http://localhost:8080/customer/coupons/categoryId/${categoryId}`;
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
  updateCustomerDetails(): Observable<Customer> {
    const url = `http://localhost:8080/customer/details`;
    return this.httpClient.put<Customer>(url, Customer);
  }
}
