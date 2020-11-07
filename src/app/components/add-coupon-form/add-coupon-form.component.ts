import { AuthenticationService } from './../../service/authentication';
import { ActivatedRoute, Router } from '@angular/router';
import { Coupon } from 'src/app/models/coupon';
import { CompanyService } from './../../service/company';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
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
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.authentication.userValue || this.authentication.userValue.clientType !== ClientType.COMPANY) {
      this.router.navigate(['log-out']);
    }
    this.couponModel = new Coupon();
    this.activatedRoute.params.subscribe((params) => {
      console.log(params.companyName);
      this.couponModel.companyName = params.companyName;
    });

    this.addCouponForm = this.formBuilder.group({
      category: ['', Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      amount: [0, Validators.required],
      price: [0, Validators.required],
      image: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(255)]],
    });
  }

  private get f() {
    return this.addCouponForm.controls;
  }

  valuesImplementation() {
    this.couponModel.categoryName = this.f.category.value;
    this.couponModel.title = this.f.title.value;
    this.couponModel.description = this.f.description.value;
    this.couponModel.startDate = this.f.startDate.value;
    this.couponModel.endDate = this.f.endDate.value;
    this.couponModel.amount = this.f.amount.value;
    this.couponModel.price = this.f.price.value;
    this.couponModel.image = this.f.image.value;

  }


  onSubmit() {
    if (this.addCouponForm.invalid) {
      return;
    }
    this.valuesImplementation();
    this.companyService.addCoupon(this.couponModel).subscribe(() => {
      this.router.navigate(['companyHome']);
    });
  }
}
