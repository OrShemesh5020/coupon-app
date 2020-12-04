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
      var date = new Date(this.couponView.startDate);
      this.alertService.error(`This coupon will be launched on ${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`);
    }
  }
}
