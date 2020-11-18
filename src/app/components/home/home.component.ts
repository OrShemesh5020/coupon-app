import { AuthenticationService } from './../../service/authentication';
import { GeneralService } from './../../service/general';
import { Coupon } from './../../models/coupon';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  coupons: Coupon[];
  displayByCategory = {};

  constructor(private generalService: GeneralService, private authentication: AuthenticationService) { }

  ngOnInit(): void {
    this.loadCoupons();
  }

  loadCoupons(): void {
    this.generalService.loadCoupons().subscribe((values: Coupon[]) => {
      this.coupons = values;
      this.loadCategories();
    });
  }

  printTitle(coupon: Coupon): void {
    console.log(coupon.title);
  }

  loadCategories(): void {
    this.coupons.forEach((coupon: Coupon) => {
      if (!this.displayByCategory[coupon.categoryName]) {
        this.displayByCategory[coupon.categoryName] = [coupon];
      } else {
        this.displayByCategory[coupon.categoryName].push(coupon);
      }
    });
    console.log(this.displayByCategory);
  }
}
