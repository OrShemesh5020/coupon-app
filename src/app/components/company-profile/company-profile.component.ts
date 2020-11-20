import { CompanyService } from './../../service/company';
import { Company } from './../../models/company';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss']
})
export class CompanyProfileComponent implements OnInit {
  company: Company;
  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    this.companyService.getDetails().subscribe((value: Company) => {
      this.company = value;
    });
  }

}
