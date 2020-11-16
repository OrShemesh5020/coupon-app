import { Coupon } from './../../models/coupon';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coupons-view',
  templateUrl: './coupons-view.component.html',
  styleUrls: ['./coupons-view.component.scss']
})
export class CouponsViewComponent implements OnInit {
  ccoupons: Coupon[];
  constructor() { }

  ngOnInit(): void {
  }

}
