import { RouteConfigLoadStart, Router, NavigationStart } from '@angular/router';
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
  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        console.log(event.url);
        if (event.url === '/sign-in' || event.url === '/home/public/sign-up/customer' || event.url === '/home/public/sign-up/company') {
          this.className = 'auth-form-wrapper';
        } else {
          this.className = 'app-wrapper';
        }
      }
    });
  }
  ngOnInit(): void {

  }



}
