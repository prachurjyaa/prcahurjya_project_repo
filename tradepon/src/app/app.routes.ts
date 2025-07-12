import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AboutComponent } from './pages/about/about.component';
import { TradingComponent } from './pages/trading/trading.component';
import { CouponsComponent } from './pages/coupons/coupons.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

import { ContactComponent } from './pages/contact/contact.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'about', component: AboutComponent },
  { path: 'trading', component: TradingComponent },
  { path: 'coupons', component: CouponsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'dashboard', component: DashboardComponent }
];
