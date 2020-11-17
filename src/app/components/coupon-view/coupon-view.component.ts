import { Coupon } from './../../models/coupon';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-coupon-view',
  templateUrl: './coupon-view.component.html',
  styleUrls: ['./coupon-view.component.scss']
})
export class CouponViewComponent implements OnInit {
  @Input() couponView: Coupon;
  constructor() { }

  ngOnInit(): void {
  }

}
