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

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.getDetails();
  }

  getDetails(): void {
    this.customerService.getCustomerDetails().subscribe((value: Customer) => {
      this.customer = value;
    });

  }
  updateDetails(){
    this.customerService.updateCustomerDetails().subscribe((value: ))
  }
  purchaseCoupon(coupon: Coupon) {
    this.customerService.purchaseCoupon(coupon);
  }
  removePurchasedCoupon(coupon: Coupon){
    this.customerService.removePurchasedCoupon(coupon);
  }
  getCoupon(){

  }
  getCustomerCouponsByCategory(categoryId: number): Observable<Coupon[]> {
    return this.customerService.getCustomerCouponsByCategory(categoryId);
  }
  getCustomerCouponsByPrice(price: number): Observable<Coupon[]>{
    return this.customerService.getCustomerCouponsByPrice(price);
}
 loadCoupon(): void{
   this.customerService.loadCoupons();
 }
}

