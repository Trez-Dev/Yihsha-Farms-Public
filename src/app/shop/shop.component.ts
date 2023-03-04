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
export class ShopComponent implements OnInit{
  // products: Product[] = shoppingData.slice(0,9);
  // leftProducts: Product[] = shoppingData.slice(0,3);

  products: any;
  leftProducts: any;
  databaseData: any;
  constructor(private silasProductService: SilasProductServiceService, private database: PocketbaseService){}

  ngOnInit(): void {
    this.database.getPocketBaseData().then(data =>{
      this.products = data.slice(0,8);
      this.leftProducts = data.slice(0,3);
      console.log(data);
    })
  }

  firstPage(){
  this.products = [];
   this.products = this.databaseData.slice(0,9);
  }

  nextPage(){
    this.products = this.databaseData.slice(9,18)
  }

  restOfProducts(){
    this.products = this.databaseData.slice(19,23)
  }

  starNum(n: number): Array<number> {
    return Array(n);
  }

  navigateProductLanding(productId: any){
    console.log(productId)
      this.silasProductService.navigateToProduct(productId)
  }
}
