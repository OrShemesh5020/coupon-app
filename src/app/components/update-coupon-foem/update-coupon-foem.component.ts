import { ClientType } from './../../models/user';
import { CompanyService } from './../../service/company';
import { AuthenticationService } from './../../service/authentication';
import { Coupon } from 'src/app/models/coupon';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-coupon-foem',
  templateUrl: './update-coupon-foem.component.html',
  styleUrls: ['./update-coupon-foem.component.scss']
})
export class UpdateCouponFoemComponent implements OnInit {
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
      console.log(params.companyName);
      this.couponModel.companyName = params.companyName;
      this.editcouponFormInitialization();
    });
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
