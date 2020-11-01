import { Subject } from 'rxjs';
import { Coupon } from './../models/coupon';

import { HttpClient } from '@angular/common/http';

export class CompanyService {
  addCouponEvent: Subject<Coupon> = new Subject();
  getCouponEvent: Subject<Coupon> = new Subject();
  coupons: Coupon[];
  constructor(private httpClient: HttpClient) { }

  addCoupon(coupon: Coupon): void {
    const url = 'http://localhost:8080/company/coupon';
    this.httpClient.post(url, coupon).subscribe((value: Coupon) => {
      this.coupons.push(value);
      this.addCouponEvent.next(value);
    });
  }

  updateCoupon(coupon: Coupon): void {
    const url = 'http://localhost:8080/company/coupon';
    this.httpClient.put(url, coupon).subscribe((value: Coupon) => {
      this.loadCoupons();
      this.addCouponEvent.next(value);
    });
  }

  deleteCoupon(id: number): void {
    const url = `http://localhost:8080/company/coupon/${id}`;
    this.httpClient.delete(url);
    this.loadCoupons();
  }

  getCouponById(id: number): void {
    const url = `http://localhost:8080/company/coupon/${id}`;
    this.httpClient.get(url).subscribe((value: Coupon) => {
      this.getCouponEvent.next(value);
    });
  }

  getCouponByTitle(couponTitle: string): void {
    const url = 'http://localhost:8080/company/coupon';
    this.httpClient.get(url, {
      params: {
        title: couponTitle,
      }
    }).subscribe((value: Coupon) => {
      this.getCouponEvent.next(value);
    });
  }

  getCompanyCouponsByPrice(price: number): void {
    const url = `http://localhost:8080/company/coupons/price/${price}`;


  }

  loadCoupons(): void {
    const url = 'http://localhost:8080/company/coupons';
    this.httpClient.get(url).subscribe((values: Coupon[]) => {
      this.coupons = values;
    });
  }
}
