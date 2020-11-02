import { Company } from './../models/company';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { Coupon } from './../models/coupon';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  // addCouponEvent: Subject<Coupon> = new Subject();
  // getCouponEvent: Subject<Coupon> = new Subject();
  // coupons: Coupon[];
  // private couponsEvent: BehaviorSubject<Coupon[]>;

  constructor(private httpClient: HttpClient) { }


  addCoupon(coupon: Coupon): Observable<Coupon> {
    const url = 'http://localhost:8080/company/coupon';
    return this.httpClient.post<Coupon>(url, coupon);
  }

  updateCoupon(coupon: Coupon): void {
    const url = 'http://localhost:8080/company/coupon';
    this.httpClient.put(url, coupon).subscribe((value: Coupon) => {
      this.loadCoupons();
      // this.addCouponEvent.next(value);
    });
  }

  deleteCoupon(id: number): void {
    const url = `http://localhost:8080/company/coupon/${id}`;
    this.httpClient.delete(url);
    this.loadCoupons();
  }

  getCouponById(id: number): Observable<Coupon> {
    const url = `http://localhost:8080/company/coupon/${id}`;
    return this.httpClient.get<Coupon>(url);
  }

  getCouponByTitle(couponTitle: string): Observable<Coupon> {
    const url = 'http://localhost:8080/company/coupon';
    return this.httpClient.get<Coupon>(url, {
      params: {
        title: couponTitle,
      }
    });
  }

  getCompanyCouponsByPrice(price: number): Observable<Coupon[]> {
    const url = `http://localhost:8080/company/coupons/price/${price}`;
    return this.httpClient.get<Coupon[]>(url);
  }

  getCompanyCouponsByCategory(categoryId: number): Observable<Coupon[]> {
    const url = `http://localhost:8080/company/coupons/categoryId/${categoryId}`;
    return this.httpClient.get<Coupon[]>(url);
  }

  getDetails(): Observable<Company> {
    const url = 'http://localhost:8080/company/details';
    return this.httpClient.get<Company>(url);
  }

  updateDetails(company: Company): Observable<Company> {
    const url = 'http://localhost:8080/company/details';
    return this.httpClient.put<Company>(url, company);
  }

  loadCoupons(): Observable<Coupon[]> {
    const url = 'http://localhost:8080/company/coupons';
    return this.httpClient.get<Coupon[]>(url);
  }
}
