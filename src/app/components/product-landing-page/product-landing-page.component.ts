import { CurrencyPipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PocketbaseService } from 'src/app/pocketbase.service';
import { shoppingData } from 'src/app/shared/shopping-data';
import { SilasService } from 'src/app/silas.service';
import { CartStore } from 'src/app/store/cart.store';
import { Product } from '../../shared/product.model';

@Component({
  selector: 'app-product-landing-page',
  templateUrl: './product-landing-page.component.html',
  styleUrls: ['./product-landing-page.component.css'],
  providers: [CartStore]
})
export class ProductLandingPageComponent implements OnInit{

  selection: boolean = true;
  selectedProduct: any;
  itemAdded: boolean | undefined;
  // productId: string = '';

  landingProduct: any;
  relatedProducts: any;
  quantity: number = 1;

  constructor(private activatedRoute: ActivatedRoute, 
    private cartStore: CartStore,
    private database: PocketbaseService,
    private silas: SilasService,
    // private currencyPipe: CurrencyPipe
    ){}

  cartItems$ = this.cartStore.cartItems$;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data => {
      // this.productId = data['id']
      this.database.viewPocketBaseData(data['id']).then(info =>{
        this.selectedProduct = info;
      })
    })
    this.database.getPocketBaseData().then(data=>{
      this.relatedProducts=data.slice(0,3);
    })
    this.silas.loadCart();
    this.items = this.silas.getItems();
  }

  starNum(n: number): Array<number> {
    return Array(n);
  }

  description(){
    this.selection = true;
  }

  reviews(){
    this.selection = false
  }

  // addToCart(){
  //   this.cartStore.addCartItem(this.selectedProduct);
  //   this.cartStore.cartItems$.subscribe(items => {
  //     localStorage.setItem('shoping-cart', `{"productDetails":${JSON.stringify(items)},"quantity":${JSON.stringify(this.quantity)}}`);
  //   })
  //   window.location.reload();
  // }


  items: any = [];
  sampleSuggestionsArray = [
    {
      id: "1",
      menuName: "Item 1",
      variationCost: "20.50",
      qtyTotal: 0
    },
    {
      id: "2",
      menuName: "Item 2",
      variationCost: "10",
      qtyTotal: 0
    },
    {
      id: "3",
      menuName: "Item 3",
      variationCost: "5.50",
      qtyTotal: 0
    }
  ];

  //----- add item to cart
  addToCart(item: any) {
    item.quantity = this.quantity;
    if (!this.silas.itemInCart(item)) {
      item.qtyTotal = 1;
      this.silas.addToCart(item); //add items in cart
      this.items = [...this.silas.getItems()];
      this.itemAdded = true;
    }
  }
}
