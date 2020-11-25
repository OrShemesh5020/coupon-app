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
  filteredCoupon: Coupon[];
  allCategories: string[];
  couponsByCategory = {};
  filterType: string;

  constructor(private generalService: GeneralService, private authentication: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.loadCoupons();
  }

  loadCoupons(): void {
    this.generalService.loadCoupons().subscribe((values: Coupon[]) => {
      this.coupons = values.filter((value: Coupon) => {
        return (new Date(value.startDate).valueOf()) <= new Date().valueOf() && value.amount > 0;
      });
      this.showAllcoupon();
      this.setCategories();
    });
  }

  showAllcoupon(): void {
    this.filteredCoupon = this.coupons;
    this.refreshCoupons();
  }

  setCategories(): void {
    this.allCategories = Object.keys(this.couponsByCategory);
  }

  openProfile(coupon: Coupon): void {
    this.router.navigate(['home/public/coupon-details', coupon.id]);
  }

  getCompanyCouponsByCategory(categoryName: string): void {
    this.filteredCoupon = this.coupons.filter((value: Coupon) => {
      return value.categoryName === categoryName;
    });
    this.refreshCoupons();
  }

  getCompanyCouponsByPrice(price: number): void {
    this.filteredCoupon = this.coupons.filter((value: Coupon) => {
      return value.price <= price;
    });
    this.refreshCoupons();
  }

  getCouponsByTitle(title: string): void {
    this.filteredCoupon = this.coupons.filter((value: Coupon) => {
      return value.title === title;
    });
    this.refreshCoupons();
  }

  setFilterType(filterEelement: HTMLSelectElement): void {
    const selectedFilter =
      filterEelement.options[filterEelement.selectedIndex].value;
    this.filterType = selectedFilter === 'all' ? null : selectedFilter;
    if (!this.filterType) {
      this.showAllcoupon();
    }
  }

  filterCoupons(): void {
    const filterInput = (document.getElementById('filter-input') as HTMLInputElement).value;
    if (this.filterType === 'title') {
      this.getCouponsByTitle(filterInput);
    } else {
      this.getCompanyCouponsByPrice(parseInt(filterInput));
    }
    (document.getElementById('filter-input') as HTMLInputElement).value = '';
  }

  filterByCategory(filterEelement: HTMLSelectElement): void {
    const selectedFilter = filterEelement.options[filterEelement.selectedIndex].value;
    this.getCompanyCouponsByCategory(selectedFilter);
  }

  refreshCoupons(): void {
    this.couponsByCategory = {};
    this.sortByCategory();
  }

  sortByCategory(): void {
    this.filteredCoupon.forEach((coupon: Coupon) => {
      if (!this.couponsByCategory[coupon.categoryName]) {
        this.couponsByCategory[coupon.categoryName] = [coupon];
      } else {
        this.couponsByCategory[coupon.categoryName].push(coupon);
      }
    });
  }
}
