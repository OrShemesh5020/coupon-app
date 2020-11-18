import { AuthenticationService } from './../../service/authentication';
import { GeneralService } from './../../service/general';
import { Coupon } from './../../models/coupon';
import { Company } from './../../models/company';
import { AdminService } from './../../service/admin';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  coupons: Coupon[];

  constructor(private generalService: GeneralService, private authentication: AuthenticationService) { }

  ngOnInit(): void { }
}
