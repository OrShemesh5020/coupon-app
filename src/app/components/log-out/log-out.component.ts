import { AuthenticationService } from './../../service/authentication';
import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.scss']
})
export class LogOutComponent implements OnInit {

  constructor(private router: Router, private authentication: AuthenticationService) {
    console.log("i'm in log out");
    this.authentication.logout();
    this.router.navigate(['/']);
  }

  ngOnInit(): void {

  }

}
