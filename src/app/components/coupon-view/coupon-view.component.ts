import { AlertService } from './../../service/alert';
import { Coupon } from './../../models/coupon';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-coupon-view',
  templateUrl: './coupon-view.component.html',
  styleUrls: ['./coupon-view.component.scss']
})
export class CouponViewComponent implements OnInit {
  @Input() couponView: Coupon;
  @Output() choosing: EventEmitter<Coupon> = new EventEmitter();
  @Input() enableClick: boolean;

  constructor(private alertService: AlertService) { }

  ngOnInit(): void { }

  onClick(): void {
    if (this.enableClick) {
      this.choosing.emit(this.couponView);
    }
    else {
      this.alertService.error('this coupon has not been launched');
    }
  }
}
