import { AddCustomerFormComponent } from './components/add-customer-form/add-customer-form.component';
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
  { path: 'adminHome', component: AdminHomeComponent },
  { path: 'companyHome', component: CompanyHomeComponent },
  { path: 'customerHome', component: CustomerHomeComponent },
  { path: 'addCustomerForm', component: AddCustomerFormComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'log-out', component: LogOutComponent},
  { path: 'sign-up', component: SignUpComponent },
  { path: '**', component: PageNotFoundComponent },

];
