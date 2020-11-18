import { Observable } from 'rxjs';
import { AdminService } from './../../service/admin';
import { ClientType, User } from './../../models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from './../../service/company';
import { AuthenticationService } from './../../service/authentication';
import { Company } from 'src/app/models/company';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-company-form',
  templateUrl: './update-company-form.component.html',
  styleUrls: ['./update-company-form.component.scss']
})
export class UpdateCompanyFormComponent implements OnInit {
  updateCompanyForm: FormGroup;
  companyModel: Company;
  loading = true;
  constructor(
    private formBuilder: FormBuilder,
    private authentication: AuthenticationService,
    private companyService: CompanyService,
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.companyModel = new Company();
    this.activatedRoute.params.subscribe((params) => {
      this.getModel(params.id).subscribe((value: Company) => {
        this.companyModel = value;
        this.editcompanyFormInitialization();
      });
    });
  }

  ngOnInit(): void { }

  private get user(): User {
    return this.authentication.userValue;
  }
  private editcompanyFormInitialization(): void {
    this.updateCompanyForm = this.formBuilder.group({
      name:
        [
          {
            value: this.companyModel.name,
            disabled: true
          },
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(45)
          ],
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
    this.loading = false;
  }

  private getModel(id: number): Observable<Company> {
    if (this.authentication.userValue.clientType === ClientType.COMPANY) {
      return this.companyService.getDetails();
    }
    return this.adminService.getCompanyById(id);
  }

  onSubmit() {
    if (this.updateCompanyForm.invalid) {
      return;
    }
    this.valuesImplementation();
    if (this.user.clientType === ClientType.COMPANY) {
      this.companyService.updateDetails(this.companyModel).subscribe(() => {
        this.router.navigate([this.authentication.getUrl]);
      });
    }
    else if (this.user.clientType === ClientType.ADMINISTRATOR) {
      this.adminService.updateCompany(this.companyModel).subscribe(() => {
        this.router.navigate([this.authentication.getUrl]);
      });
    }

  }

  valuesImplementation(): void {
    this.companyModel.name = this.getter.name.value;
    this.companyModel.email = this.getter.email.value;
    this.companyModel.password = this.getter.password.value;
  }

  private get getter() {
    return this.updateCompanyForm.controls;
  }
}
