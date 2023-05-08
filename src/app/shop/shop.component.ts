import { AfterViewInit, Component, OnInit } from '@angular/core';
import { shoppingData } from '../shared/shopping-data';
import { Product } from '../shared/product.model';
import { SilasService } from '../silas.service';
import { PocketbaseService } from '../pocketbase.service';
import { zip } from 'rxjs';

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
  bundleNum: number = 0;
  snackNum: number = 0;
  teaNum: number = 0;
  searchItem: any;
  image = '../../assets/images/Plant.gif';
  constructor(private silasProductService: SilasService, private database: PocketbaseService){}

  ngOnInit(): void {
    this.database.getPocketBaseData().then(data =>{
      this.databaseData = data.items.sort((a: {name:any}, z: {name: any}) => a.name.localeCompare(z.name));
      this.products = data.items.sort((a: {name:any}, z: {name: any}) => a.name.localeCompare(z.name)).slice(0,9);
      this.leftProducts = data.items.sort((a: {name:any}, z: {name: any}) => z.name.localeCompare(a.name)).slice(0,3);
      this.seasoningNum = this.databaseData.filter(product => product.type === 'Seasonings').length;
      this.sauceNum = this.databaseData.filter(product => product.type === 'Sauces').length;
      this.bundleNum = this.databaseData.filter(product => product.type === 'Bundles').length;
      this.snackNum = this.databaseData.filter(product => product.type === 'Snacks').length;
      this.teaNum = this.databaseData.filter(product => product.type === 'Teas').length;
    });

    console.log(this.bundleNum)
  };


  sort(event: any){
    let sorting = event.target.value;
    switch (sorting) {
      case '0':
        this.products=[];
        this.products = this.databaseData.sort((a, b) => a.name.localeCompare(b.name)).slice(0,9);
        break;
      case '1':
        this.products = [];
        this.products = this.databaseData.sort((lowest: {price: any}, highest: {price: any}) => lowest.price - highest.price).slice(0,9)
        break;
      case '2':
        this.products = [];
        this.products = this.databaseData.sort((lowest: {price: any}, highest: {price: any}) => highest.price - lowest.price).slice(0,9)
        break;
      case '3':
        this.products = [];
        this.products = this.databaseData.sort((lowest, highest) => highest.star - lowest.star).slice(0,9)
        break;
      default:
        break;
    }
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
