import { ClientType } from 'src/app/models/user';
import { AuthGuard } from './service/auth-guard';
import { UpdateCustomerFormComponent } from './components/update-customer-form/update-customer-form.component';
import { AddCustomerFormComponent } from './components/add-customer-form/add-customer-form.component';
import { UpdateCompanyFormComponent } from './components/update-company-form/update-company-form.component';
import { AddCompanyFormComponent } from './components/add-company-form/add-company-form.component';
import { UpdateCouponFormComponent } from './components/update-coupon-form/update-coupon-form.component';
import { AddCouponFormComponent } from './components/add-coupon-form/add-coupon-form.component';
import { LogOutComponent } from './components/log-out/log-out.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { Routes } from '@angular/router';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { CompanyHomeComponent } from './components/company-home/company-home.component';
import { CustomerHomeComponent } from './components/customer-home/customer-home.component';
export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'home/administrator',
    component: AdminHomeComponent,
    canActivate: [AuthGuard],
    data: {
      connectionRequired: true,
      clientType: ClientType.ADMINISTRATOR
    }
  },
  {
    path: 'home/company',
    component: CompanyHomeComponent,
    canActivate: [AuthGuard],
    data: {
      connectionRequired: true,
      clientType: ClientType.COMPANY
    }
  },
  { path: 'addCompanyForm', component: AddCompanyFormComponent },
  { path: 'updateCompanyForm/:id', component: UpdateCompanyFormComponent },
  { path: 'addCouponForm/:companyName', component: AddCouponFormComponent },
  { path: 'updateCouponForm/:id', component: UpdateCouponFormComponent },
  {
    path: 'home/customer',
    component: CustomerHomeComponent,
    canActivate: [AuthGuard],
    data: {
      connectionRequired: true,
      clientType: ClientType.CUSTOMER
    }
  },
  { path: 'addCustomerForm', component: AddCustomerFormComponent },
  { path: 'updateCustomerForm/:id', component: UpdateCustomerFormComponent },
  { path: 'about', component: AboutUsComponent },
  {
    path: 'sign-in',
    component: SignInComponent,
    canActivate: [AuthGuard],
    data: {
      disconnectionRequired: true,
    }
  },
  { path: 'log-out', component: LogOutComponent },
  {
    path: 'sign-up',
    component: SignUpComponent,
    canActivate: [AuthGuard],
    data: {
      disconnectionRequired: true,
    }
  },
  { path: '**', component: PageNotFoundComponent },

];
