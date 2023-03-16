import { Component, OnInit } from '@angular/core';
import { shoppingData } from '../shared/shopping-data';
import { Product } from '../shared/product.model';
import { SilasService } from '../silas.service';
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
  databaseData: Product[] = [];
  seasoningNum: number = 0;
  sauceNum: number = 0;
  jerkNum: number = 0;
  constructor(private silasProductService: SilasService, private database: PocketbaseService){}

  ngOnInit(): void {
    this.database.getPocketBaseData().then(data =>{
      this.databaseData = data;
      this.products = data.slice(0,9);
      this.leftProducts = data.slice(0,3);
      this.seasoningNum = this.databaseData.filter(product => product.type === 'Seasonings').length
      this.sauceNum = this.databaseData.filter(product => product.type === 'Pepper Sauces').length
      this.jerkNum = this.databaseData.filter(product => product.type === 'Jerk Seasoning').length
    })
  }

  firstPage(){
  this.products = [];
   this.products = this.databaseData.slice(0,9);
  }

  nextPage(){
    this.products = [];
    this.products = this.databaseData.slice(9,18)
  }

  restOfProducts(){
    this.products = [];
    this.products = this.databaseData.slice(19,23)
  }

  starNum(n: number): Array<number> {
    return Array(n);
  }

  navigateProductLanding(productId: any){
    console.log(productId)
      this.silasProductService.navigateToProduct(productId)
  }

  filterProduct(type: string){
  this.products = [];
  this.products = this.databaseData.slice(0,9).filter(product => product.type === type);
  }
}
