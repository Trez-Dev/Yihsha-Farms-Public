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
import { FileUploadComponent } from './test/file-upload.component';
import { LoginComponent } from './login-page/login/login.component';
import { SignUpComponent } from './login-page/sign-up/sign-up.component';
import { CartComponent } from './shop/cart/cart.component';
import { CheckoutComponent } from './shop/checkout/checkout.component';

const routes: Routes = [
{ path: 'home', component: HomeComponent},
{ path: 'about', component: AboutComponent},
{ path: 'contact', component: ContactComponent },
{ path: 'shop', component: ShopComponent },
{ path: 'cart', component: CartComponent },
{ path: 'checkout', component: CheckoutComponent },
{ path: 'product-landing/:id', component: ProductLandingPageComponent },
{ path: 'shoping-cart', component: ShopingCartComponent },
{ path: 'file-upload', component: FileUploadComponent },
{ path: 'product-state-test', component: ProductsPageComponent},
{ path: 'user-page/:id', component: LoginPageComponent },
{ path: 'login', component: LoginComponent },
{ path: 'sign-up', component: SignUpComponent },
{path: '', redirectTo: '/home', pathMatch: 'full'},
{path: '**', redirectTo: '/home', },
];


@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration: 'top'}),RouterTestingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
