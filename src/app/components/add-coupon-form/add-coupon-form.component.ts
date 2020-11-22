import { Company } from './../../models/company';
import { User } from './../../models/user';
import { AuthenticationService } from './../../service/authentication';
import { ActivatedRoute, Router } from '@angular/router';
import { Coupon } from 'src/app/models/coupon';
import { CompanyService } from './../../service/company';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientType } from 'src/app/models/user';

@Component({
  selector: 'app-add-coupon-form',
  templateUrl: './add-coupon-form.component.html',
  styleUrls: ['./add-coupon-form.component.scss']
})
export class AddCouponFormComponent implements OnInit {
  addCouponForm: FormGroup;
  couponModel: Coupon;
  constructor(
    private formBuilder: FormBuilder,
    private authentication: AuthenticationService,
    private companyService: CompanyService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.couponModel = new Coupon();
    this.companyService.getDetails().subscribe((value: Company) => {
      this.couponModel.companyName = value.name;
    });

    this.addCouponForm = this.formBuilder.group({
      category:
        ['',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(45)
          ]
        ],
      title:
        ['',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(45)
          ]
        ],
      description:
        ['',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(200)
          ]
        ],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      amount: [0, Validators.required],
      price: [0, Validators.required],
      image:
        ['',
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(255)
          ]
        ],
    });
  }

  private get getter() {
    return this.addCouponForm.controls;
  }

  private get user(): User {
    return this.authentication.userValue;
  }

  valuesImplementation(): void {
    this.couponModel.categoryName = this.getter.category.value;
    this.couponModel.title = this.getter.title.value;
    this.couponModel.description = this.getter.description.value;
    this.couponModel.startDate = this.getter.startDate.value;
    this.couponModel.endDate = this.getter.endDate.value;
    this.couponModel.amount = this.getter.amount.value;
    this.couponModel.price = this.getter.price.value;
    this.couponModel.image = this.getter.image.value;

  }


  onSubmit(): void {
    if (this.addCouponForm.invalid) {
      return;
    }
    this.valuesImplementation();
    this.companyService.addCoupon(this.couponModel).subscribe(() => {
      this.router.navigate([this.authentication.getUrl]);
    });
  }
}
