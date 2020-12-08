import {
  RouteConfigLoadStart,
  Router,
  NavigationStart,
  NavigationEnd,
  ResolveStart,
  ActivationStart
} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'couponSystem';
  className = 'wrapper';
  isAppLoading: boolean = true;

  constructor(private router: Router) {
    const formRoutes = [
      'sign-up/company',
      'sign-up/customer',
      'add/company',
      'add/customer',
      'update/company',
      'update/customer',
      'company/add-coupon',
      'company/update/details',
      'company/update/coupon',
      'customer/update/details',
      'sign-in',
    ];

    this.router.events.subscribe((event) => {
      if (event instanceof ActivationStart) {
        this.isAppLoading = true;
      }

      if (event instanceof NavigationStart) {
        this.isAppLoading = true;

        if (formRoutes.filter(route => event.url.includes(route)).length === 1) {
          this.className = 'auth-form-wrapper';
        } else {
          this.className = 'app-wrapper';
        }
      }

      if (event instanceof NavigationEnd) {
        this.isAppLoading = false;
      }
    });
  }
  ngOnInit(): void {

  }
}
