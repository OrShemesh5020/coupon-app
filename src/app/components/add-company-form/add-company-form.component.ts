import { AdminService } from './../../service/admin';
import { ClientType, User } from './../../models/user';
import { AuthenticationService } from './../../service/authentication';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/company';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/service/general';

@Component({
  selector: 'app-add-company-form',
  templateUrl: './add-company-form.component.html',
  styleUrls: ['./add-company-form.component.scss']
})
export class AddCompanyFormComponent implements OnInit {
  addCompanyForm: FormGroup;
  companyModel: Company;
  buttonText: string;

  constructor(
    private formBuilder: FormBuilder,
    private authentication: AuthenticationService,
    private generalService: GeneralService,
    private adminService: AdminService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.buttonText = !this.user ? 'REGISTER COMPANY' : 'ADD COMPANY';
    this.companyModel = new Company();
    this.addCompanyForm = this.formBuilder.group({
      name:
        ['',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(45)
          ]
        ],
      email:
        ['',
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(45)
          ]
        ],
      password:
        ['',
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(45)
          ]
        ],
      confirmPassword:
        ['',
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(45)
          ]
        ],
    });
  }

  private get user(): User {
    return this.authentication.userValue;
  }

  onSubmit(): void {
    if (this.addCompanyForm.invalid) {
      return;
    }
    if (!this.thePasswordsMatch()) {
      console.log('the passwords do not match!');
      return;
    }
    this.valuesImplementation();
    if (!this.user) {
      this.generalService.registerCompany(this.companyModel).subscribe(() => {
        this.authentication
          .login(this.companyModel.email, this.companyModel.password)
          .subscribe(() => {
            this.router.navigate([this.authentication.getUrl]);
          });
      });
    }
    else if (this.user.clientType === ClientType.ADMINISTRATOR) {
      this.adminService.addCompany(this.companyModel).subscribe(() => {
        this.router.navigate([this.authentication.getUrl]);
      });
    }
  }

  thePasswordsMatch(): boolean {
    const password = this.getter.password.value;
    const confirmPassword = this.getter.confirmPassword.value;
    return password === confirmPassword;
  }

  valuesImplementation(): void {
    this.companyModel.name = this.getter.name.value;
    this.companyModel.email = this.getter.email.value;
    this.companyModel.password = this.getter.password.value;
  }

  private get getter() {
    return this.addCompanyForm.controls;
  }

}
