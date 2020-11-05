import { Customer } from 'src/app/models/customer';
import { HttpClient } from '@angular/common/http';
import { User } from './../models/user';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Company } from '../models/company';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  userSubject: BehaviorSubject<User>;

  // currntUser: Subject<User> = new Subject();
  // public user: Observable<any>;

  constructor(private httpClient: HttpClient) {
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('activeUser')));
    // this.user = this.userSubject.asObservable();
  }

  public get userValue() {
    // console.log('user value: ' + this.userSubject.value);
    return this.userSubject.value;
  }


  public login(mail: string, pass: string) {
    // console.log('authentication clientType: ' + clientType);
    const url = 'http://localhost:8080/general/login';
    return this.httpClient
      .get<User>(url, {
        params: {
          // type: clientType,
          email: mail,
          password: pass,
        },
        observe: 'response'
      }).pipe(map(res => {
        const user = res.body;
        user.token = res.headers.get('token');
        localStorage.setItem('activeUser', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
    // .subscribe((res) => {
    //   // this.user.token = res.headers.get('token');
    //   // console.log(res.headers.get('token'));
    //   // console.log(res.body);
    //   const user = new User(res.body.id, res.body.email, res.body.password, res.body.clientType);
    //   user.token = res.headers.get('token');
    //   console.log(user);
    //   this.loginEvent.next(user);
    //   // this.user = value;
    //   // console.log('login function value: ' + value);
    //   // console.log('login function user: ' + this.user);
    //   // // this.user.token=
    //   // this.loginEvent.next(value);
    // });
  }

  public logout() {
    // remove user from local storage and set current user to null
    // console.log("i'm in log out function");
    console.log('i"m in log out function');
    localStorage.removeItem('activeUser');
    localStorage.removeItem('currentUrl');
    // localStorage.removeItem('requestedPortal');
    this.userSubject.next(null);
  }
}
