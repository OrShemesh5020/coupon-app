import { AuthenticationService } from './authentication';
import { SignInComponent } from './../components/sign-in/sign-in.component';
import { Layout, ComponentType } from '../models/layout';
import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  private portalUrl = 'home';
  constructor(private authentication: AuthenticationService) {
    console.log("LayoutService constructor");
    this.authentication.userSubject.subscribe((value: User) => {
      if (localStorage.getItem('currentUrl')) {
        this.portalUrl = localStorage.getItem('currentUrl');
        console.log("portalUrl: " + this.portalUrl);
      }
    });
  }
  layoutConponents: Layout[] = [
    {
      id: 1,
      navigation: this.portalUrl,
      title: 'Home',
      type: ComponentType.HEADER,
    },
    {
      id: 2,
      navigation: 'about',
      title: 'about us',
      type: ComponentType.HEADER,
    },
    // {
    //   id: 3,
    //   navigation: 'sign-in',
    //   title: 'sign in',
    //   type: ComponentType.HEADER,
    // },
    // {

    //   id: 4,
    //   navigation: 'log-out',
    //   title: 'log out',
    //   type: ComponentType.HEADER,
    // },
    // {
    //   id: 5,
    //   navigation: 'sign-up',
    //   title: 'sign up',
    //   type: ComponentType.HEADER,
    // },
  ];

  getByType(componentName: ComponentType): Layout[] {
    return this.layoutConponents.filter(
      (layoutConponent) => layoutConponent.type === componentName
    );
  }
}
