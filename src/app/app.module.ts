import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './components/sign-up/sign-up.component';
import { LoginComponent } from './components/login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { Page404Component } from './components/reusables/page404.component';
import { ButtonModule } from 'primeng/button';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {MenuModule} from "primeng/menu"
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { CategoryCardComponent } from './components/reusables/category-card.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductItemComponent } from './components/reusables/product-item.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RatingComponent } from './components/reusables/rating.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { ProductPageComponent } from './components/product-page/product-page.component';
import { ReviewComponent } from './components/reusables/review.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    NavbarComponent,
    Page404Component,
    DashboardComponent,
    CategoryListComponent,
    CategoryCardComponent,
    ProductListComponent,
    ProductItemComponent,
    RatingComponent,
    ProductPageComponent,
    ReviewComponent,
    MyAccountComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ButtonModule,
    MenuModule,
    NgbModule,
    NgxPaginationModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    })
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
