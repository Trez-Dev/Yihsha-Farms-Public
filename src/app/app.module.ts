import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ScrollingModule} from '@angular/cdk/scrolling';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SilasProductServiceService } from './silas-product-service.service';
import { HomeComponent } from './home/home.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { BestSellingProductsComponent } from './components/best-selling-products/best-selling-products.component';
import { ServicesCardComponent } from './components/services-card/services-card.component';
import { OfferingsComponent } from './components/offerings/offerings.component';
import { CustomerReviewsComponent } from './components/customer-reviews/customer-reviews.component';
import { RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ShopComponent } from './shop/shop.component';
import { ContactComponent } from './contact/contact.component';
import { ProductLandingPageComponent } from './components/product-landing-page/product-landing-page.component';
import { ShopingCartComponent } from './components/shoping-cart/shoping-cart.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { MatButton } from '@angular/material/button';
import { Dialog } from '@angular/cdk/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { LoginComponent } from './login-page/login/login.component';
import { SignUpComponent } from './login-page/sign-up/sign-up.component';
import { ProductsPageComponent } from './store/products-test-page.component';
import { FileUploadComponent } from './test/file-upload.component';



// const appRoutes = [
//   { path: '', component: HomeComponent },
//   { path: 'about', component: AboutComponent },
//   { path: 'contact', component: ContactComponent },
//   { path: 'shop', component: ShopComponent },
// ]


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LandingPageComponent,
    BestSellingProductsComponent,
    ServicesCardComponent,
    OfferingsComponent,
    CustomerReviewsComponent,
    AboutComponent,
    ShopComponent,
    ContactComponent,
    ProductLandingPageComponent,
    ShopingCartComponent,
    LoginPageComponent,
    DialogComponent,
    LoginComponent,
    SignUpComponent,
    ProductsPageComponent,
    FileUploadComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MatNativeDateModule,
    ScrollingModule
    // RouterModule.forRoot(appRoutes)
  ],
  providers: [
    SilasProductServiceService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
