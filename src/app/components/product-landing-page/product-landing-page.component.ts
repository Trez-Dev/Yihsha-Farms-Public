import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PocketbaseService } from 'src/app/pocketbase.service';
import { shoppingData } from 'src/app/shared/shopping-data';
import { SilasProductServiceService } from 'src/app/silas-product-service.service';
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
  // productId: string = '';

  landingProduct: any;
  relatedProducts: any;

  constructor(private activatedRoute: ActivatedRoute, private cartStore: CartStore,private database: PocketbaseService){}

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

  addToCart(){
    this.cartStore.addCartItem(this.selectedProduct);
    this.cartStore.cartItems$.subscribe(items => {
      console.log(JSON.stringify(items))
      localStorage.setItem('shoping-cart', JSON.stringify(items));
    })
    window.location.reload();
  }

}
