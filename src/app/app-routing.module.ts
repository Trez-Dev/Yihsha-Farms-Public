import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ShopComponent } from './shop/shop.component';
import { ProductLandingPageComponent } from './components/product-landing-page/product-landing-page.component';
import { ShopingCartComponent } from './components/shoping-cart/shoping-cart.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ProductsPageComponent } from './store/products-test-page.component';

const routes: Routes = [
{ path: '', component: HomeComponent },
{ path: 'about', component: AboutComponent },
{ path: 'contact', component: ContactComponent },
{ path: 'shop', component: ShopComponent },
{ path: 'product-landing/:id', component: ProductLandingPageComponent },
// { path: 'product-landing', component: ProductLandingPageComponent },
{ path: 'shoping-cart', component: ShopingCartComponent },
{ path: 'product-state-test', component: ProductsPageComponent},
{ path: 'login', component: LoginPageComponent },
{path: '', redirectTo: '/home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration: 'enabled'}),RouterTestingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
