import { Router } from '@angular/router';
import { AuthenticationService } from './../../service/authentication';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {

  constructor(public authentication: AuthenticationService, private router: Router) { }

  ngOnInit(): void { }

  openProfile(): void {
    this.router.navigate([`${this.authentication.getUrl}/profile`]);
  }
}
