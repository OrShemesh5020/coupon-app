import { User } from './../../models/user';
import { AuthenticationService } from './../../service/authentication';
import { LayoutService } from '../../service/layout';
import { Component, OnInit } from '@angular/core';
import { Layout, ComponentType } from 'src/app/models/layout';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  headerItems: Layout[];
  user: User;
  constructor(private layoutService: LayoutService, private authentication: AuthenticationService) {
    this.authentication.userSubject.subscribe((value: User) => {
      console.log("HeaderComponent constructor: " + value);
      this.user = value;
    });
    //   if (this.authentication.userValue) {
    //   this.user = this.authentication.userValue;
    //   console.log(this.user);
    // }
    // this.authentication.logout();
  }

  ngOnInit(): void {
    this.headerItems = this.layoutService.getByType(ComponentType.HEADER);
  }
}
