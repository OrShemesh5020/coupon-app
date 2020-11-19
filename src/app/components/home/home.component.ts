import { Router } from '@angular/router';
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

  constructor(private generalService: GeneralService, private authentication: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.loadCoupons();
  }

  loadCoupons(): void {
    this.generalService.loadCoupons().subscribe((values: Coupon[]) => {
      this.coupons = values.filter((value: Coupon) => {
        return (new Date(value.startDate).valueOf()) <= new Date().valueOf();
      });
      this.loadCategories();
    });
  }

  openProfile(coupon: Coupon): void {
    this.router.navigate(['home/public/coupon-details', coupon.id]);
  }

  loadCategories(): void {
    this.coupons.forEach((coupon: Coupon) => {
      if (!this.displayByCategory[coupon.categoryName]) {
        this.displayByCategory[coupon.categoryName] = [coupon];
      } else {
        this.displayByCategory[coupon.categoryName].push(coupon);
      }
    });
  }
}
