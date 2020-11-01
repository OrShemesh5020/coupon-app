import { Company } from './../../models/company';
import { AdminService } from './../../service/admin';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.adminService.addCompanyEvent.subscribe((value: Company) => {
      console.log(value);
    });
    // this.adminService.loadElements();
  }

  getCompany(): void {
    console.log(this.adminService.getCompanyById(6));
  }
}
