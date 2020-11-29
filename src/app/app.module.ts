import { UpdateCouponFormComponent } from './components/update-coupon-form/update-coupon-form.component';
import { SendToken } from './service/interseptors/send-token';
import { routes } from './app.routes';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ConfigComponent } from './config/config/config.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { CompanyHomeComponent } from './components/company-home/company-home.component';
import { CustomerHomeComponent } from './components/customer-home/customer-home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddCustomerFormComponent } from './components/add-customer-form/add-customer-form.component';
import { UpdateCustomerFormComponent } from './components/update-customer-form/update-customer-form.component';
import { AddCompanyFormComponent } from './components/add-company-form/add-company-form.component';
import { UpdateCompanyFormComponent } from './components/update-company-form/update-company-form.component';
import { AddCouponFormComponent } from './components/add-coupon-form/add-coupon-form.component';
import { CompaniesViewComponent } from './components/companies-view/companies-view.component';
import { CustomersViewComponent } from './components/customers-view/customers-view.component';
import { CouponViewComponent } from './components/coupon-view/coupon-view.component';
import { CouponProfileComponent } from './components/coupon-profile/coupon-profile.component';
import { ProfileDisplayComponent } from './components/profile-display/profile-display.component';
import { AlertComponent } from './components/alert/alert.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    PageNotFoundComponent,
    AboutUsComponent,
    SignInComponent,
    ConfigComponent,
    AdminHomeComponent,
    CompanyHomeComponent,
    CustomerHomeComponent,
    AddCustomerFormComponent,
    UpdateCustomerFormComponent,
    AddCompanyFormComponent,
    UpdateCompanyFormComponent,
    AddCouponFormComponent,
    UpdateCouponFormComponent,
    CompaniesViewComponent,
    CustomersViewComponent,
    CouponViewComponent,
    CouponProfileComponent,
    ProfileDisplayComponent,
    AlertComponent,
    ConfirmationDialogComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SendToken,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
