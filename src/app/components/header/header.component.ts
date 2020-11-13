import { AuthenticationService } from './../../service/authentication';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  constructor(public authentication: AuthenticationService) { }

  ngOnInit(): void { }
}
