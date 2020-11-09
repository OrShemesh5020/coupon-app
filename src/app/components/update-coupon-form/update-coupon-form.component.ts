import { ClientType } from '../../models/user';
import { CompanyService } from '../../service/company';
import { AuthenticationService } from '../../service/authentication';
import { Coupon } from 'src/app/models/coupon';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-coupon-form',
  templateUrl: './update-coupon-form.component.html',
  styleUrls: ['./update-coupon-form.component.scss']
})
export class UpdateCouponFormComponent implements OnInit {
  editCouponForm: FormGroup;
  couponModel: Coupon;
  constructor(
    private formBuilder: FormBuilder,
    private authentication: AuthenticationService,
    private companyService: CompanyService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.authentication.userValue || this.authentication.userValue.clientType !== ClientType.COMPANY) {
      this.router.navigate(['log-out']);
    }
    this.couponModel = new Coupon();
    this.activatedRoute.params.subscribe((params) => {
      console.log('UpdateCouponFoemComponent:' + params.id);
      this.companyService.getCouponById(params.id).subscribe((value: Coupon) => {
        this.couponModel = value;
        console.log('couponModel: ' + this.couponModel);
        this.editcouponFormInitialization();
      });
    });
  }

  onSubmit(): void {
    if (this.editCouponForm.invalid) {
      return;
    }
    this.valuesImplementation();
    this.companyService.updateCoupon(this.couponModel).subscribe(() => {
      this.router.navigate(['companyHome']);
    });
  }

  private get f() {
    return this.editCouponForm.controls;
  }

  valuesImplementation(): void {
    this.couponModel.categoryName = this.f.category.value;
    this.couponModel.title = this.f.title.value;
    this.couponModel.description = this.f.description.value;
    this.couponModel.startDate = this.f.startDate.value;
    this.couponModel.endDate = this.f.endDate.value;
    this.couponModel.amount = this.f.amount.value;
    this.couponModel.price = this.f.price.value;
    this.couponModel.image = this.f.image.value;
  }

  private editcouponFormInitialization(): void {
    this.editCouponForm = this.formBuilder.group({
      category:
        [this.couponModel.categoryName,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(45)
        ]
        ],
      title:
        [this.couponModel.title,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(45)
        ]
        ],
      description:
        [this.couponModel.description,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(200)
        ]
        ],
      startDate: [this.couponModel.startDate, Validators.required],
      endDate: [this.couponModel.endDate, Validators.required],
      amount: [this.couponModel.amount, Validators.required],
      price: [this.couponModel.price, Validators.required],
      image:
        [this.couponModel.image,
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(255)
        ]
        ],
    });
  }

}
