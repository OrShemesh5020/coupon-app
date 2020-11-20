import { CustomerProfileComponent } from './components/customer-profile/customer-profile.component';
import { CompanyProfileComponent } from './components/company-profile/company-profile.component';
import { CouponProfileComponent } from './components/coupon-profile/coupon-profile.component';
import { ClientType } from 'src/app/models/user';
import { AuthGuard } from './service/auth-guard';
import { UpdateCustomerFormComponent } from './components/update-customer-form/update-customer-form.component';
import { AddCustomerFormComponent } from './components/add-customer-form/add-customer-form.component';
import { UpdateCompanyFormComponent } from './components/update-company-form/update-company-form.component';
import { AddCompanyFormComponent } from './components/add-company-form/add-company-form.component';
import { UpdateCouponFormComponent } from './components/update-coupon-form/update-coupon-form.component';
import { AddCouponFormComponent } from './components/add-coupon-form/add-coupon-form.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { Routes, CanActivate } from '@angular/router';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { CompanyHomeComponent } from './components/company-home/company-home.component';
import { CustomerHomeComponent } from './components/customer-home/customer-home.component';
export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'public' },
      {
        path: 'public',
        children: [
          { path: '', component: HomeComponent },
          {
            path: 'sign-up',
            children: [
              {
                path: 'company', component: AddCompanyFormComponent,
                canActivate: [AuthGuard],
                data: { disconnectionRequired: true }
              },
              {
                path: 'customer', component: AddCustomerFormComponent,
                canActivate: [AuthGuard],
                data: { disconnectionRequired: true }
              }
            ]
          },
          { path: 'coupon-details/:id', component: CouponProfileComponent }
        ]
      },
      {
        path: 'administrator',
        children: [
          {
            path: '', component: AdminHomeComponent,
            canActivate: [AuthGuard],
            data: { clientType: ClientType.ADMINISTRATOR }
          },
          {
            path: 'add',
            children: [
              {
                path: 'company', component: AddCompanyFormComponent,
                canActivate: [AuthGuard],
                data: { clientType: ClientType.ADMINISTRATOR }
              },
              {
                path: 'customer', component: AddCustomerFormComponent,
                canActivate: [AuthGuard],
                data: { clientType: ClientType.ADMINISTRATOR }
              }
            ]
          },
          {
            path: 'update',
            children: [
              {
                path: 'company/:id', component: UpdateCompanyFormComponent,
                canActivate: [AuthGuard],
                data: { clientType: ClientType.ADMINISTRATOR }
              },
              {
                path: 'customer/:id', component: UpdateCustomerFormComponent,
                canActivate: [AuthGuard],
                data: { clientType: ClientType.ADMINISTRATOR }
              }
            ]
          }
        ]
      },
      {
        path: 'company',
        children: [
          {
            path: '', component: CompanyHomeComponent,
            canActivate: [AuthGuard],
            data: { clientType: ClientType.COMPANY }
          },
          {
            path: 'add-coupon', component: AddCouponFormComponent,
            canActivate: [AuthGuard],
            data: { clientType: ClientType.COMPANY }
          },
          {
            path: 'coupon-details/:id', component: CouponProfileComponent,
            canActivate: [AuthGuard],
            data: { clientType: ClientType.COMPANY }
          },
          {
            path: 'update',
            children: [
              {
                path: 'details', component: UpdateCompanyFormComponent,
                canActivate: [AuthGuard],
                data: { clientType: ClientType.COMPANY }
              },
              {
                path: 'coupon/:id', component: UpdateCouponFormComponent,
                canActivate: [AuthGuard],
                data: { clientType: ClientType.COMPANY }
              }
            ]
          },
          {
            path: 'profile', component: CompanyProfileComponent,
            canActivate: [AuthGuard],
            data: { clientType: ClientType.COMPANY }
          }
        ]
      },
      {
        path: 'customer',
        children: [
          {
            path: '', component: CustomerHomeComponent,
            canActivate: [AuthGuard],
            data: { clientType: ClientType.CUSTOMER }
          },
          {
            path: 'coupon-details/:id', component: CouponProfileComponent,
            canActivate: [AuthGuard],
            data: { clientType: ClientType.CUSTOMER }
          },
          {
            path: 'update-details', component: UpdateCustomerFormComponent,
            canActivate: [AuthGuard],
            data: { clientType: ClientType.CUSTOMER }
          },
          {
            path: 'profile', component: CustomerProfileComponent,
            canActivate: [AuthGuard],
            data: { clientType: ClientType.CUSTOMER }
          }
        ]
      }
    ]
  },
  { path: 'about', component: AboutUsComponent },
  {
    path: 'sign-in', component: SignInComponent,
    canActivate: [AuthGuard],
    data: { disconnectionRequired: true }
  },
  { path: '**', component: PageNotFoundComponent },

];
