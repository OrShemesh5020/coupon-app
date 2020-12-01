import { ConfirmationDialog } from './../../service/confirmation-dialog';
import { Router } from '@angular/router';
import { AuthenticationService } from './../../service/authentication';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(
    public authentication: AuthenticationService,
    private router: Router,
    private confirmationDialog: ConfirmationDialog
  ) { }

  ngOnInit(): void { }

  openProfile(): void {
    this.router.navigate([`${this.authentication.getUrl}/profile`]);
  }

  logout(): void {
    this.confirmationDialog.confirm(
      'Log out alert',
      'Are you sure you want to log out?',
      'Yes, I want to log out',
      'stay'
    ).then((confirmed: boolean) => {
      if (confirmed) {
        this.authentication.logout();
      } else {
        this.router.navigate([this.authentication.getUrl]);
      }
    });
  }
}
