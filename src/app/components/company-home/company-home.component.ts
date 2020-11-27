import { AuthenticationService } from 'src/app/service/authentication';
import { CompanyService } from './../../service/company';
import { Coupon } from './../../models/coupon';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-home',
  templateUrl: './company-home.component.html',
  styleUrls: ['./company-home.component.scss'],
})
export class CompanyHomeComponent implements OnInit {
  coupons: Coupon[];
  filteredCoupon: Coupon[];
  allCategories: string[];
  couponsByCategory = {};
  filterType: string;

  constructor(
    private companyService: CompanyService,
    private router: Router,
    private authentication: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.loadCoupons();
  }

  loadCoupons(): void {
    this.companyService.loadCoupons().subscribe((values: Coupon[]) => {
      this.coupons = values;
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

  addCoupon(): void {
    this.router.navigate([`${this.authentication.getUrl}/add-coupon`]);
  }

  getCouponByTitle(title: string): void {
    this.companyService.getCouponByTitle(title).subscribe((value: Coupon) => {
      this.filteredCoupon = [];
      this.filteredCoupon.push(value);
      this.refreshCoupons();
    });
  }

  getCompanyCouponsByPrice(price: number): void {
    this.companyService.getCompanyCouponsByPrice(price).subscribe((values: Coupon[]) => {
      this.filteredCoupon = values;
      this.refreshCoupons();
    });
  }

  getCompanyCouponsByCategory(categoryName: string): void {
    this.companyService.getCompanyCouponsByCategory(categoryName).subscribe((values: Coupon[]) => {
      this.filteredCoupon = values;
      this.refreshCoupons();
    });
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

  setFilterType(filterEelement: HTMLSelectElement): void {
    const selectedFilter = filterEelement.options[filterEelement.selectedIndex].value;
    this.filterType = selectedFilter === 'all' ? null : selectedFilter;
    if (!this.filterType) {
      this.showAllcoupon();
    }
  }

  filterCoupons(): void {
    let filterInput;
    if (this.filterType === 'title') {
      filterInput = (document.getElementById('filter-input-title') as HTMLInputElement).value;
      this.getCouponByTitle(filterInput.toLowerCase());
      (document.getElementById('filter-input-title') as HTMLInputElement).value = '';
    } else {
      filterInput = (document.getElementById('filter-input-price') as HTMLInputElement).value;
      this.getCompanyCouponsByPrice(filterInput);
      (document.getElementById('filter-input-price') as HTMLInputElement).value = '';
    }
  }

  filterByCategory(filterEelement: HTMLSelectElement): void {
    const selectedFilter = filterEelement.options[filterEelement.selectedIndex].value;
    this.getCompanyCouponsByCategory(selectedFilter);
  }

  refreshCoupons(): void {
    this.couponsByCategory = {};
    this.sortByCategory();
  }
  openCouponProfile(coupon: Coupon): void {
    this.router.navigate([`${this.authentication.getUrl}/coupon-details`, coupon.id]);
  }
}
