import { Component } from '@angular/core';
import { PocketbaseService } from 'src/app/pocketbase.service';
import { shoppingData } from 'src/app/shared/shopping-data';
import { SilasProductServiceService } from 'src/app/silas-product-service.service';
import {Product} from '../../shared/product.model'

@Component({
  selector: 'app-card-one',
  templateUrl: './card-one.component.html',
  styleUrls: ['./card-one.component.css']
})
export class CardOneComponent {

  products: any;

  constructor(private silasProductService: SilasProductServiceService, private database: PocketbaseService){}

  ngOnInit(): void {
    this.database.getPocketBaseData().then(data =>{
      this.products = data;
      console.log(data);
    })
    
  }

  starNum(n: number): Array<number> {
    return Array(n);
  }

  navigateProductLanding(product: Product){
    this.silasProductService.navigateToProduct(product)
  }

}
