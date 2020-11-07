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
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ConfigComponent } from './config/config/config.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { CompanyHomeComponent } from './components/company-home/company-home.component';
import { CustomerHomeComponent } from './components/customer-home/customer-home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LogOutComponent } from './components/log-out/log-out.component';
import { AddCustomerFormComponent } from './components/add-customer-form/add-customer-form.component';
import { UpdateCustomerFormComponent } from './components/update-customer-form/update-customer-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    PageNotFoundComponent,
    AboutUsComponent,
    SignInComponent,
    SignUpComponent,
    ConfigComponent,
    AdminHomeComponent,
    CompanyHomeComponent,
    CustomerHomeComponent,
    LogOutComponent,
    AddCustomerFormComponent,
    UpdateCustomerFormComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
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
export class AppModule {}
