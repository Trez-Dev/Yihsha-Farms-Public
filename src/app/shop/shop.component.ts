import { Component } from '@angular/core';
import { shoppingData } from '../shared/shopping-data';
import { Product } from '../shared/product.model';
import { SilasProductServiceService } from '../silas-product-service.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent {

  constructor(private silasProductService: SilasProductServiceService){}

  products: Product[] = shoppingData.filter((Product, i) => i < 9)
  leftProducts: Product[] = shoppingData.filter((Product, i) => i < 3)

  nextPage(){
    this.products = shoppingData.filter((Product, i) => i > 9 && i < 19)
  }

  restOfProducts(){
    this.products = shoppingData.filter((Product, i) => i > 19)
  }

  starNum(n: number): Array<number> {
    return Array(n);
  }

  navigateProductLanding(product: Product){
      this.silasProductService.navigateToProduct(product)
  }
}
