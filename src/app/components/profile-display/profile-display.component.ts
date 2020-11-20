import { CompanyService } from './../../service/company';
import { Company } from './../../models/company';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-display',
  templateUrl: './profile-display.component.html',
  styleUrls: ['./profile-display.component.scss']
})
export class ProfileDisplayComponent implements OnInit {
  company: Company;

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    this.companyService.getDetails().subscribe((value: Company) => {
      this.company = value;
    });
  }

  updateDetails(): void {

  }
}
