import { Company } from './../../models/company';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-companies-view',
  templateUrl: './companies-view.component.html',
  styleUrls: ['./companies-view.component.scss']
})
export class CompaniesViewComponent implements OnInit {
  @Input() companiesView: Company[];
  @Output() updateCompany: EventEmitter<Company> = new EventEmitter();
  @Output() deleteCompany: EventEmitter<Company> = new EventEmitter();
  @Output() addCompany: EventEmitter<void> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onEditCompany(company: Company): void {
    this.updateCompany.emit(company);
  }

  onDeleteCompany(company: Company): void {
    this.deleteCompany.emit(company);
  }

  onAddCompany(): void {
    this.addCompany.emit();
  }
}
