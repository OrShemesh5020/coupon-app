import { AdminService } from './../../service/admin';
import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/company';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    // this.adminService.getCompanyEvent.subscribe((value: Company) => {
    //   console.log(value);
    // })
  }


  onClick(id: number) {
    this.adminService.getCompanyById(id);
  }
}
