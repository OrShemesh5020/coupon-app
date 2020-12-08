import { AlertService } from './../../service/alert';
import { GeneralService } from './../../service/general';
import { AuthenticationService } from 'src/app/service/authentication';
import { Router } from '@angular/router';
import { Coupon } from './../../models/coupon';
import { CustomerService } from './../../service/customer';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-home',
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.scss'],
})
export class CustomerHomeComponent implements OnInit {
  coupons: Coupon[];
  filteredCoupons: Coupon[];
  allCategories: string[];
  couponsByCategory = {};
  filterType: string;

  constructor(
    private customerService: CustomerService,
    private alertService: AlertService,
    private router: Router,
    private authentication: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.loadCoupons();
  }

  loadCoupons(): void {
    this.customerService.loadCoupons().subscribe((values: Coupon[]) => {
      this.coupons = values;
      this.showAllcoupon();
      this.setCategories();
    });
  }

  showAllcoupon(): void {
    this.filteredCoupons = this.coupons;
    this.refreshCoupons();
  }

  setCategories(): void {
    this.allCategories = Object.keys(this.couponsByCategory);
  }

  getCustomerCouponsByCategory(categoryName: string): void {
    this.customerService.getCustomerCouponsByCategory(categoryName).subscribe((values: Coupon[]) => {
      this.filteredCoupons = values;
      if (this.filteredCoupons.length === 0) {
        this.alertService.error(`no coupons found in category '${categoryName}'`);
      }
      this.refreshCoupons();
    });
  }
  getCustomerCouponsByPrice(price: number): void {
    this.customerService.getCustomerCouponsByPrice(price).subscribe((values: Coupon[]) => {
      this.filteredCoupons = values;
      if (this.filteredCoupons.length === 0) {
        this.alertService.error(`no coupons found for a price less than ${price}₪`);
      }
      this.refreshCoupons();
    });
  }

  getCustomerCouponsByTitle(title: string): void {
    this.filteredCoupons = this.coupons.filter((value: Coupon) => {
      return value.title.startsWith(title);
    });
    if (this.filteredCoupons.length === 0) {
      this.alertService.error(`no coupons were found whose name begins with '${title}'`);
    }
    this.refreshCoupons();
  }

  setFilterType(filterEelement: HTMLSelectElement): void {
    const selectedFilter = filterEelement.options[filterEelement.selectedIndex].value;
    this.filterType = selectedFilter === 'all' ? null : selectedFilter;
    if (!this.filterType) {
      this.showAllcoupon();
    }
  }

  filterByCategory(filterEelement: HTMLSelectElement): void {
    const selectedFilter = filterEelement.options[filterEelement.selectedIndex].value;
    this.getCustomerCouponsByCategory(selectedFilter);
  }

  filterCoupons(): void {
    let filterInput;
    if (this.filterType === 'title') {
      filterInput = (document.getElementById('filter-input-title') as HTMLInputElement).value;
      this.getCustomerCouponsByTitle(filterInput.toLowerCase());
      (document.getElementById('filter-input-title') as HTMLInputElement).value = '';
    } else {
      filterInput = (document.getElementById('filter-input-price') as HTMLInputElement).value;
      this.getCustomerCouponsByPrice(filterInput);
      (document.getElementById('filter-input-price') as HTMLInputElement).value = '';
    }
  }

  sortByCategory(): void {
    this.filteredCoupons.forEach((coupon: Coupon) => {
      if (!this.couponsByCategory[coupon.categoryName]) {
        this.couponsByCategory[coupon.categoryName] = [coupon];
      } else {
        this.couponsByCategory[coupon.categoryName].push(coupon);
      }
    });
  }

  refreshCoupons(): void {
    this.couponsByCategory = {};
    this.sortByCategory();
  }


  openCouponProfile(coupon: Coupon): void {
    this.router.navigate([`${this.authentication.getUrl}/coupon-details`, coupon.id]);
  }
}
