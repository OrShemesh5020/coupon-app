import { HttpClient } from '@angular/common/http';
import { User } from './../models/user';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  userSubject: BehaviorSubject<User>;

  constructor(private httpClient: HttpClient) {
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('activeUser')));
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  public get getUrl(): string {
    if (!this.userValue) {
      return '';
    }
    return `home/${this.userValue.clientType.toLowerCase()}`;
  }


  public login(mail: string, pass: string): Observable<User> {
    const url = 'http://localhost:8080/general/login';
    return this.httpClient
      .get<User>(url, {
        params: {
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
  }

  public logout(): void {
    localStorage.removeItem('activeUser');
    this.userSubject.next(null);
  }
}
