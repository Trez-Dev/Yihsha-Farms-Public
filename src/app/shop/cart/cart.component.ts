import { AfterViewInit, Component, DoCheck, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { SilasService } from 'src/app/silas.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, DoCheck{
  @ViewChildren("subTotalWrap")
  subTotalItems!: QueryList<ElementRef>;
  @ViewChildren("subTotalWrap_existing")subTotalItems_existing!: QueryList<ElementRef>;

  constructor(private silas: SilasService){}

  quantity!: number;
  ngDoCheck(): void {
    this.silas.loadCart();
    this.items = this.silas.getItems();
  }
  ngOnInit(): void {
    this.silas.loadCart();
    this.items = this.silas.getItems();
  }

 

  items: any = [];

  //----- calculate total
  get total() {
    return this.items.reduce((sum: any, x: any) => (
      {
        quantity: 1,
        price: sum.price + x.quantity * x.price
      }),
      { 
      quantity: 1, 
      price: 0
      }).price;
  }

   //----- remove specific item
   removeFromCart(item: any) {
    this.silas.removeItem(item);
    this.items = this.silas.getItems();
  }

   //----- clear cart item
   clearCart(items: any) {
    // this.items.forEach((item: any, index: any) => this.silas.removeItem(index));
    this.silas.clearCart(items);
    this.items = [...this.silas.getItems()];
  }

  minus(item: any){
    this.silas.itemUpdate(item, -1);
    this.silas.loadCart();
    this.items = this.silas.getItems();
  }

  plus(item: any){
    this.silas.itemUpdate(item, 1);
    this.silas.loadCart();
    this.items = this.silas.getItems();
  }
}
