import { AuthenticationService } from './../authentication';
import { routes } from './../../app.routes';
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
import { GeneralService } from '../general';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SendToken implements HttpInterceptor {
  user: User;
  constructor(private authentication: AuthenticationService, private route: Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('send token interceptor');
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
            errMsg = `Error: ${error.error.message}`;
          }
          else {
            errMsg = `Error Code: ${error.status},  Message: ${error.message}`;
            if (error.status === 401) {
              this.authentication.logout();
              this.route.navigate(['sign-in']);
            }
            if (error.status === 403) {
              console.log("you can't accsess this function!");
            }
          }
          console.log(errMsg);
          return throwError(errMsg);
        })
      );
  }
}
