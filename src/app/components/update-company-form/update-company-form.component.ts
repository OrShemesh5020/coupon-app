import { Observable } from 'rxjs';
import { AdminService } from './../../service/admin';
import { ClientType, User } from './../../models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from './../../service/company';
import { AuthenticationService } from './../../service/authentication';
import { Company } from 'src/app/models/company';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-company-form',
  templateUrl: './update-company-form.component.html',
  styleUrls: ['./update-company-form.component.scss']
})
export class UpdateCompanyFormComponent implements OnInit {
  editCompanyForm: FormGroup;
  companyModel: Company;
  constructor(
    private formBuilder: FormBuilder,
    private authentication: AuthenticationService,
    private companyService: CompanyService,
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.authentication.userValue || this.authentication.userValue.clientType === ClientType.CUSTOMER) {
      this.router.navigate(['log-out']);
    }
    this.companyModel = new Company();
    this.activatedRoute.params.subscribe((params) => {
      if (this.user.clientType === ClientType.COMPANY && this.user.id != params.id) {
        this.router.navigate(['log-out']);
      }
      this.getModel(params.id).subscribe((value: Company) => {
        this.companyModel = value;
        this.editcompanyFormInitialization();
      });
    });

  }

  private get user(): User {
    return this.authentication.userValue;
  }
  private editcompanyFormInitialization(): void {
    this.editCompanyForm = this.formBuilder.group({
      name:
        [this.companyModel.name,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(45)
        ]
        ],
      email:
        [this.companyModel.email,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(45)
        ]
        ],
      password:
        [this.companyModel.password,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(45)
        ]
        ],
    });
  }

  private getModel(id: number): Observable<Company> {
    if (this.authentication.userValue.clientType === ClientType.COMPANY) {
      console.log('geting model from company service');
      return this.companyService.getDetails();
    }
    console.log('geting model from admin service');
    return this.adminService.getCompanyById(id);
  }

  onSubmit() {
    if (this.editCompanyForm.invalid) {
      return;
    }
    this.valuesImplementation();
    if (this.user.clientType === ClientType.COMPANY) {
      this.companyService.updateDetails(this.companyModel).subscribe(() => {
        this.router.navigate(['companyHome']);
      });
    }
    else if (this.user.clientType === ClientType.ADMINISTRATOR) {
      this.adminService.updateCompany(this.companyModel).subscribe(() => {
        this.router.navigate(['adminHome']);
      });
    }

  }

  valuesImplementation(): void {
    this.companyModel.name = this.getter.name.value;
    this.companyModel.email = this.getter.email.value;
    this.companyModel.password = this.getter.password.value;
  }

  private get getter() {
    return this.editCompanyForm.controls;
  }
}
