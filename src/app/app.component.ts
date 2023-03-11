import { Component, OnInit } from '@angular/core';
import { SilasProductServiceService } from './silas-product-service.service'; 
import { Router } from '@angular/router';
import { Product } from './shared/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'Yihsha Farms';
  status: boolean = false;
  hide: boolean = false;

  cartStatus: boolean = false;
  cartItems: any;
  cart: any;

  constructor(){}


  ngOnInit() {
    this.cart = localStorage.getItem('shoping-cart');
    this.cartItems = JSON.parse(this.cart);

    if (this.cart != null) {
      this.cartStatus = true;
    }
  }
  
  hideShop(){
  this.hide = !this.hide 
  console.log(`${this.cartStatus}`);
  }

  clearShoppingCart(){
    localStorage.removeItem('shoping-cart');
    window.location.reload();
  }
}
