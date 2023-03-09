import { Component } from '@angular/core';
import { PocketbaseService } from 'src/app/pocketbase.service';
import { shoppingData } from 'src/app/shared/shopping-data';
import { SilasProductServiceService } from 'src/app/silas-product-service.service';
import {Product} from '../../shared/product.model'

@Component({
  selector: 'app-best-selling-products',
  templateUrl: './best-selling-products.component.html',
  styleUrls: ['./best-selling-products.component.css']
})
export class BestSellingProductsComponent{

  products: Product[] = shoppingData.filter(((Product, i) => i < 4));

  constructor(private silasProductService: SilasProductServiceService, private database: PocketbaseService){}

  // ngOnInit(): void {
  //   this.database.getPocketBaseData().then(data =>{
  //     this.products = data;
  //     // console.log(data);
  //   })
  // }

  starNum(n: number): Array<number> {
    return Array(n);
  }

  navigateProductLanding(product: Product){
    this.silasProductService.navigateToProduct(product)
  }

}
