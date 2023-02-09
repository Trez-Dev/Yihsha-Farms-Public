import { Component } from '@angular/core';
import { shoppingData } from 'src/app/shared/shopping-data';
import { SilasProductServiceService } from 'src/app/silas-product-service.service';
import {Product} from '../../shared/product.model'

@Component({
  selector: 'app-card-one',
  templateUrl: './card-one.component.html',
  styleUrls: ['./card-one.component.css']
})
export class CardOneComponent {

  products: Product[] = shoppingData.filter((Product, i) => i < 4)

  constructor(private silasProductService: SilasProductServiceService){}

  starNum(n: number): Array<number> {
    return Array(n);
  }

  navigateProductLanding(product: Product){
    this.silasProductService.navigateToProduct(product)
  }

}
