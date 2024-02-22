import { Routes } from '@angular/router';
import { HomeComponent } from './components/Page/home/home.component';
import { ShopComponent } from './components/Page2/shop/shop.component';
import { ConnectComponent } from './components/Contact/connect/connect.component';
import { ProductDetailComponent } from './components/Detail/product-detail/product-detail.component';
import { ProductCategoryComponent } from './components/Page2/product-category/product-category.component';
import { CartShoppingComponent } from './components/Cart/cart-shopping/cart-shopping.component';
import { LoginComponent } from './components/User/login/login.component';
import { SignUpComponent } from './components/User/sign-up/sign-up.component';
import { ForGetPassComponent } from './components/User/for-get-pass/for-get-pass.component';
import { ProtectGuard } from './components/Guard/protect.guard';
import { AdminComponent } from './components/admin/admin.component';

import { ProductAdminComponent } from './components/admin/product-admin/product-admin.component';
import { CategoryAdminComponent } from './components/admin/category-admin/category-admin.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PaymentComponent } from './components/Cart/payment/payment.component';
import { HistoryUserComponent } from './components/history-user/history-user.component';
import { HistoryAdminComponent } from './components/admin/history-admin/history-admin.component';
import { StatisticalComponent } from './components/admin/statistical/statistical.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'product-detail/:id', component: ProductDetailComponent },
  { path: 'category/:id', component: ProductCategoryComponent },
  { path: 'connect', component: ConnectComponent },
  { path: 'shop', component: ShopComponent },
  { path: 'sign-in', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'product', component: ProductAdminComponent },
  { path: 'category', component: CategoryAdminComponent },
  { path: 'historyAdmin', component: HistoryAdminComponent },
  { path: 'pay', component: PaymentComponent },
  { path: 'history', component: HistoryUserComponent },
  { path: 'statistical', component: StatisticalComponent },
  {
    path: 'for-password',
    component: ForGetPassComponent,
    canActivate: [ProtectGuard],
  },
  { path: 'cart', component: CartShoppingComponent },
  { path: '**', component: NotFoundComponent },
];
