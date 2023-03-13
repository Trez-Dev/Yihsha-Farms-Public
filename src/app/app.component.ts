import { Component, OnInit } from '@angular/core';
import { SilasProductServiceService } from './silas-product-service.service'; 
import { Router } from '@angular/router';
import { Product } from './shared/product.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'Yihsha Farms';
  status: boolean = false;
  hide: boolean = false;
  loginStatus: boolean = false;

  cartStatus: boolean = false;
  cartItems: any;
  cart: any;
  // user: any;

  userLogin: any;

  constructor(public dialogbox: MatDialog){}


  ngOnInit() {
    this.cart = localStorage.getItem('shoping-cart');
     
    this.cartItems = JSON.parse(this.cart);

    // this.user = ;
    this.userLogin = JSON.parse(localStorage.getItem('user-login') || '{"image":"../assets/images/user.png","loginStatus":false}');
    console.log(this.userLogin)
    if (this.cart != null) {
      this.cartStatus = true;
    }
    if (this.userLogin.loginStatus == false){
      this.loginStatus = false;
    }else{
      this.loginStatus = true;
    }
  }
  
  hideShop(){
  this.hide = !this.hide 
  console.log(`${this.cartStatus}`);
  }

  clearShoppingCart(){
    // localStorage.removeItem('shoping-cart');
    localStorage.clear();
    window.location.reload();
  }

  logOut(enterAnimationDuration: string, exitAnimationDuration: string){
    this.dialogbox.open(DialogComponent,{
      enterAnimationDuration,
      exitAnimationDuration,
      data: {title: 'Are You Sure?', selected: "logout"}
    })
  }
}
