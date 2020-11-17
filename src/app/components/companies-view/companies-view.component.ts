import { Company } from './../../models/company';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-companies-view',
  templateUrl: './companies-view.component.html',
  styleUrls: ['./companies-view.component.scss']
})
export class CompaniesViewComponent implements OnInit {
  @Input() companiesView: Company[];
  constructor() { }

  ngOnInit(): void {
  }

  printCompany(company: Company): void {
    console.log(company);
  }
}
