import { Component, OnInit } from '@angular/core';
import { shoppingData } from '../shared/shopping-data';
import { Product } from '../shared/product.model';
import { SilasProductServiceService } from '../silas-product-service.service';
import { PocketbaseService } from '../pocketbase.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent{
  products: Product[] = shoppingData.filter((Product, i) => i < 9);
  leftProducts: Product[] = shoppingData.filter((Product, i) => i < 3);
  constructor(private silasProductService: SilasProductServiceService, private database: PocketbaseService){}

  // ngOnInit(): void {
  //   this.database.getPocketBaseData().then(data =>{
  //     this.products = data.slice(0,8)
  //     this.leftProducts = data.slice(0,3)
  //     console.log(data)
  //   })
  // }


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
