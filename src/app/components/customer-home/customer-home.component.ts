import { Coupon } from './../../models/coupon';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from './../../service/customer';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-customer-home',
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.scss'],
})
export class CustomerHomeComponent implements OnInit {
  customer: Customer;
  coupons: Coupon[];

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.getDetails();
    this.customerService.loadCoupons().subscribe((values: Coupon[]) => {
      this.coupons = values;
    })
  }

  getDetails(): void {
    this.customerService.getCustomerDetails().subscribe((value: Customer) => {
      this.customer = value;
    });

  }
  updateDetails(){
    this.customerService.updateCustomerDetails().subscribe((value: Customer )=>{
    this.loadCoupons();
    })
  }
  purchaseCoupon(coupon: Coupon) {
    this.customerService.purchaseCoupon(coupon);
    this.loadCoupons();
    console.log("unfinisheddddddddddddddddddddd");
  }
  removePurchasedCoupon(couponId: number){
    this.customerService.removePurchasedCoupon(couponId);
    this.loadCoupons();
  }
  getCoupon(couponId: number): Observable<Coupon>{
   return this.customerService.getCoupon(couponId);
  }
  getCustomerCouponsByCategory(categoryId: number): Observable<Coupon[]> {
    return this.customerService.getCustomerCouponsByCategory(categoryId);
  }
  getCustomerCouponsByPrice(price: number): Observable<Coupon[]>{
    return this.customerService.getCustomerCouponsByPrice(price);
}
 loadCoupons(): void{
   this.customerService.loadCoupons();
 }
}

