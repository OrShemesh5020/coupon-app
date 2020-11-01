import { User } from './../../models/user';
import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/service/general';

@Component({
  selector: 'app-company-home',
  templateUrl: './company-home.component.html',
  styleUrls: ['./company-home.component.scss']
})
export class CompanyHomeComponent implements OnInit {
  constructor(private generalService: GeneralService) { }

  ngOnInit(): void {
    this.generalService.loginEvent.subscribe((value: User) => {
      console.log('CompanyHomeComponent: ' + value);
      // this.user = value;
    });
  }

}
