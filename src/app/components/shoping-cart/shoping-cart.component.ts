import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/shared/product.model';

@Component({
  selector: 'app-shoping-cart',
  templateUrl: './shoping-cart.component.html',
  styleUrls: ['./shoping-cart.component.css']
})
export class ShopingCartComponent implements OnInit{

  constructor(private router: Router){}

  navigateToShop(){
    this.router.navigate(['/shop']);
  }

  cartStatus: boolean = false;
  cartItems: string[] = [];
  cart: string = '';

  ngOnInit(): void{
      this.cart = JSON.stringify(localStorage.getItem('shoping-cart'));
      this.cartItems.push(JSON.parse(this.cart));
  }

  clearShoppingCart(){
    localStorage.removeItem('shoping-cart')
    window.location.reload();
  }
}
