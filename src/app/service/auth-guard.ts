import { AlertService } from './alert';
import { ClientType } from 'src/app/models/user';
import { User } from './../models/user';
import { AuthenticationService } from './authentication';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private disconnectionRequired: boolean;
  private clientType: ClientType;
  constructor(private router: Router, private authentication: AuthenticationService, private alertService: AlertService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.clientType = route.data.clientType;
    this.disconnectionRequired = route.data.disconnectionRequired;

    if (this.disconnectionRequired) {
      if (this.hasConnection()) {
        this.alertService.error('you are already logged in', true);
        this.router.navigate([this.authentication.getUrl]);
        return false;
      }
      return true;
    }

    if (!this.hasConnection()) {
      this.alertService.error('you are not logged in', true);
      this.router.navigate(['sign-in']);
      return false;
    }
    if (!this.theUserTypeMatches()) {
      this.alertService.error('you do not have access to this section of the site', true);
      this.router.navigate([this.authentication.getUrl]);
      return false;
    }
    return true;
  }

  private hasConnection(): boolean {
    if (this.currentUser) {
      return true;
    }
    return false;
  }

  theUserTypeMatches(): boolean {
    if (this.currentUser.clientType === this.clientType) {
      return true;
    }
    return false;
  }

  private get currentUser(): User {
    return this.authentication.userValue;
  }
}
