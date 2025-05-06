import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/sign-up/sign-up.component';
import { LoginComponent } from './components/login/login.component';
import { Page404Component } from './components/reusables/page404.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guard/auth.guard';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { productResolver } from './service/product.resolver';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { CartComponent } from './components/cart/cart.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { MyordersComponent } from './components/myorders/myorders.component';

const routes: Routes = [
  {
    path:'',redirectTo:'/home',pathMatch:'full'
  },
  {
    path:'home',
    component:DashboardComponent,
    canActivate:[AuthGuard],
  },
  {
    path:'register',
    component:SignupComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'home/product/:id',
    component:ProductPageComponent,
    canActivate:[AuthGuard],
    resolve:{product:productResolver}
  },
  {
    path:'myaccount',
    component:MyAccountComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'mycart',
    component:CartComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'wishlist',
    component:WishlistComponent,
    canActivate:[AuthGuard]
  },
  {
    path:'checkout',
    component:CheckoutComponent,
    canActivate:[AuthGuard]
  },
  {
    path:"myorder",
    component:MyordersComponent
  },
  {
      path:'**',
      component:Page404Component
    },
    
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
