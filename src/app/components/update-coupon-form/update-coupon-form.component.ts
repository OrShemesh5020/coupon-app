import { AlertService } from './../../service/alert';
import { ClientType, User } from '../../models/user';
import { CompanyService } from '../../service/company';
import { AuthenticationService } from '../../service/authentication';
import { Coupon } from 'src/app/models/coupon';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-coupon-form',
  templateUrl: './update-coupon-form.component.html',
  styleUrls: ['./update-coupon-form.component.scss']
})
export class UpdateCouponFormComponent implements OnInit {
  updateCouponForm: FormGroup;
  couponModel: Coupon;
  loading = true;
  constructor(
    private formBuilder: FormBuilder,
    private authentication: AuthenticationService,
    private companyService: CompanyService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) {
    this.couponModel = new Coupon();
    this.activatedRoute.params.subscribe((params) => {
      this.companyService.getCouponById(params.id).subscribe((value: Coupon) => {
        this.couponModel = value;
        this.editcouponFormInitialization();
      });
    });
  }

  ngOnInit(): void { }

  onSubmit(): void {
    if (this.updateCouponForm.invalid) {
      return;
    }
    this.valuesImplementation();
    this.convertToLowerCase();
    this.companyService.updateCoupon(this.couponModel).subscribe(() => {
      this.alertService.success('coupon successfully updated', true);
      this.router.navigate([this.authentication.getUrl]);
    });
  }

  private get getter() {
    return this.updateCouponForm.controls;
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
    this.couponModel.image = this.getter.imageUrl.value;
  }

  convertToLowerCase(): void {
    this.couponModel.categoryName = this.couponModel.categoryName.toLowerCase();
    this.couponModel.title = this.couponModel.title.toLowerCase();
  }

  private editcouponFormInitialization(): void {
    this.updateCouponForm = this.formBuilder.group({
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
      startDate: [
        {
          value: new Date(this.couponModel.startDate).toISOString().slice(0, 10),
          disabled: this.hasTheCouponBeenLaunched(),
        },
        Validators.required],
      endDate: [new Date(this.couponModel.endDate).toISOString().slice(0, 10), Validators.required],
      amount: [this.couponModel.amount, Validators.required],
      price: [this.couponModel.price, Validators.required],
      imageUrl:
        [this.couponModel.image,
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(255)
        ]
        ],
    });
    this.loading = false;
  }

  hasTheCouponBeenLaunched(): boolean {
    return new Date(this.couponModel.startDate).valueOf() < new Date().valueOf();
  }

}
