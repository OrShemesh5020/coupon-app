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
    this.router.events.subscribe((event) => {
      if (event instanceof ActivationStart) {
        this.isAppLoading = true;
      }

      if (event instanceof NavigationStart) {
        this.isAppLoading = true;
        console.log(event.url);
        if (event.url === '/sign-in' || event.url === '/home/public/sign-up/customer' || event.url === '/home/public/sign-up/company') {
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
