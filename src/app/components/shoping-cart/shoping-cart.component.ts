import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/shared/product.model';
import { SilasService } from 'src/app/silas.service';

@Component({
  selector: 'app-shoping-cart',
  templateUrl: './shoping-cart.component.html',
  styleUrls: ['./shoping-cart.component.css']
})
export class ShopingCartComponent implements OnInit, DoCheck{

  constructor(private silas: SilasService){}

  items: any = [];
  ngOnInit(): void{
      
  }

  ngDoCheck(): void {
    this.silas.loadCart();
    this.items = this.silas.getItems();
  }

  removeFromCart(item: any) {
    this.silas.removeItem(item);
    this.items = this.silas.getItems();
  }

  clearCart(items: any) {
    this.silas.clearCart(items);
    this.items = [...this.silas.getItems()];
  }

  get total() {
    return this.items.reduce(
      (sum: any, x: any) => ({
        quantity: 1,
        price: sum.price + x.quantity * x.price
      }),
      { quantity: 1, price: 0 }
    ).price;
  }
  
}
