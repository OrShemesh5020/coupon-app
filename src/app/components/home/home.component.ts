import { AlertService } from './../../service/alert';
import { Router } from '@angular/router';
import { AuthenticationService } from './../../service/authentication';
import { GeneralService } from './../../service/general';
import { Coupon } from './../../models/coupon';
import { Component, OnInit } from '@angular/core';
import { FormGroup, RadioControlValueAccessor } from '@angular/forms';
import { isNull } from "@angular/compiler/src/output/output_ast";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  coupons: Coupon[];
  filteredCoupons: Coupon[];
  allCategories: string[];
  unlaunchedCoupons: Coupon[];
  unlaunchedCouponsCategory = 'Coming soon';
  specialCategories = ['Coming soon', 'vacation'];
  couponsByCategory = {};
  filterType: string = null;
  isFilterOpen: boolean = false;

  constructor(
    private generalService: GeneralService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadCoupons();
  }

  loadCoupons(): void {
    this.generalService.loadCoupons().subscribe((values: Coupon[]) => {
      this.coupons = values.filter((value: Coupon) => {
        return (new Date(value.startDate).valueOf()) <= new Date().valueOf() && value.amount > 0;
      });
      this.unlaunchedCoupons = values.filter((value: Coupon) => {
        return (new Date(value.startDate).valueOf()) > new Date().valueOf();
      });
      this.showAllcoupon();
      this.setCategories();
    });
  }

  showAllcoupon(): void {
    this.filteredCoupons = this.coupons;
    this.refreshCoupons();
    this.setsortByCategory();
  }

  setCategories(): void {
    this.allCategories = Object.keys(this.couponsByCategory);
  }

  openProfile(coupon: Coupon): void {
    this.router.navigate(['home/public/coupon-details', coupon.id]);
  }

  getCouponsByCategory(categoryName: string): void {
    if (categoryName !== this.unlaunchedCouponsCategory) {
      this.filteredCoupons = this.coupons.filter((value: Coupon) => {
        return value.categoryName === categoryName;
      });
    }
    else {
      this.filteredCoupons = this.unlaunchedCoupons;
    }
    if (this.filteredCoupons.length === 0) {
      this.alertService.error(`no coupons found in category '${categoryName}'`);
    }
    this.refreshCoupons();
  }

  getCouponsByPrice(price: number): void {
    this.filteredCoupons = this.coupons.filter((value: Coupon) => {
      return value.price <= price;
    });
    if (this.filteredCoupons.length === 0) {
      this.alertService.error(`no coupons found for a price less than ${price}₪`);
    }
    this.refreshCoupons();
  }

  getCouponsByTitle(title: string): void {
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
    this.showAllcoupon();
  }

  filterCoupons(): void {
    let filterInput;
    if (this.filterType === 'title') {
      filterInput = (document.getElementById('filter-input-title') as HTMLInputElement).value;
      this.getCouponsByTitle(filterInput.toLowerCase());
      (document.getElementById('filter-input-title') as HTMLInputElement).value = '';
    } else {
      filterInput = (document.getElementById('filter-input-price') as HTMLInputElement).value;
      this.getCouponsByPrice(filterInput);
      (document.getElementById('filter-input-price') as HTMLInputElement).value = '';
    }
  }

  filterByCategory(filterEelement: HTMLSelectElement): void {
    const selectedFilter = filterEelement.options[filterEelement.selectedIndex].value;
    this.getCouponsByCategory(selectedFilter);
  }

  refreshCoupons(): void {
    this.couponsByCategory = {};
    this.sortByCategory();
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

  setsortByCategory(): void {
    this.unlaunchedCoupons.forEach((value: Coupon) => {
      if (!this.couponsByCategory[this.unlaunchedCouponsCategory]) {
        this.couponsByCategory[this.unlaunchedCouponsCategory] = [value];
      } else {
        this.couponsByCategory[this.unlaunchedCouponsCategory].push(value);
      }
    });
  }

  openFilter(): void {
    this.isFilterOpen = true;
  }

  closeFilter(): void {
    this.isFilterOpen = false;
  }
}
