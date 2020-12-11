import { AlertService } from './../alert';
import { AuthenticationService } from './../authentication';
import { User } from './../../models/user';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SendToken implements HttpInterceptor {
  user: User;
  constructor(
    private authentication: AuthenticationService,
    private route: Router,
    private alertService: AlertService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let newReq = req;
    this.user = this.authentication.userValue;
    if (this.user && this.user.token) {
      if (req.url.startsWith(`http://localhost:8080/general`)) {
        newReq = req;
      }
      else {
        newReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${this.user.token}`,
          },
        });
      }
    }
    return next.handle(newReq)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errMsg = '';
          if (error.error instanceof ErrorEvent) {
            errMsg = `Error: ${error.message}`;
            this.alertService.error(errMsg);
            console.log(`1: ${errMsg}`);
          }
          else {
            errMsg = `Message: ${error.error}`;
            if (error.status === 401) {
              errMsg = `Message: ${error.error.message}`;
              this.authentication.logout();
              this.route.navigate(['sign-in']);
            } else if (error.status === 404) {
              errMsg = 'not found';
              this.route.navigate([this.authentication.getUrl]);
            } else if (error.status === 500) {
              errMsg = error.error.error;
            } else {
              errMsg = 'The server did not boot';
            }
            this.alertService.error(errMsg);
          }
          return throwError(errMsg);
        })
      );
  }
}
