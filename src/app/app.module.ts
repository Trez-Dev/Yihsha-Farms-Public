import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RESTAPIServiceService } from './restapiservice.service';
import { HomeComponent } from './home/home.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { CardOneComponent } from './components/card-one/card-one.component';
import { ServicesCardComponent } from './components/services-card/services-card.component';
import { OfferingsComponent } from './components/offerings/offerings.component';
import { CustomerReviewsComponent } from './components/customer-reviews/customer-reviews.component';
import { RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ShopComponent } from './shop/shop.component';
import { ContactComponent } from './contact/contact.component';


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
    CardOneComponent,
    ServicesCardComponent,
    OfferingsComponent,
    CustomerReviewsComponent,
    AboutComponent,
    ShopComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    // RouterModule.forRoot(appRoutes)
  ],
  providers: [
    RESTAPIServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
