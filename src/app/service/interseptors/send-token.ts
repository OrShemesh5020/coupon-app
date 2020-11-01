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
    let newReq;
    this.user = this.authentication.userValue;
    if (req.url.startsWith(`http://localhost:8080/general`)) {
      // console.log('**************** login url ****************');
      // return next.handle(req);
      newReq = req;
    }
    else {
      // console.log('send token: ' + this.user.token);
      newReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.user.token}`,
          // Authorization:
          // 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MCwic3ViIjoiYWRtaW5AYWRtaW4uY29tIiwiY2xpZW50VHlwZSI6IkFETUlOSVNUUkFUT1IiLCJwYXNzd29yZCI6ImFkbWluIiwiaWF0IjoxNjAzNDM4MTE0LCJleHAiOjE2MDM0Mzk5MTR9.nLL-zXcpq9z5hlkNmZ-zS4I1JUj3yjowDmEQI2M7i3g',
        },
      });
    }
    // console.log('token: ' + newReq.headers.get('Authorization'));
    // console.log('token has been sent');
    // return null;
    return next.handle(newReq)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          let errMsg = '';
          if (error.error instanceof ErrorEvent) {
            console.log('this is client side error');
            errMsg = `Error: ${error.error.message}`;
          }
          else {
            console.log('this is server side error');
            errMsg = `Error Code: ${error.status},  Message: ${error.message}`;
            if (error.status === 403) {
              this.route.navigate(['sign-in']);
            }
          }
          console.log(errMsg);
          return throwError(errMsg);
        })
      );
  }

}
// ContentType: 'applicationu/json; cherset=utf-8',
// Accept: 'application/json',

// headers: req.headers.set(
//   'Authorization',
//   'Bearer eyJhbGciOiJIUzI1NiJ9.eyJpZCI6Niwic3ViIjoib3JAZ21haWwuY29tIiwiY2xpZW50VHlwZSI6IkNPTVBBTlkiLCJwYXNzd29yZCI6IjEyMzQ1NiIsImlhdCI6MTYwMzM1OTc0NywiZXhwIjoxNjAzMzYxNTQ3fQ.tj3RqCFL9sCC7h47Vsxb3592bjJQQARUuW3RHU0M3Xc'
// ),
