import { Component } from '@angular/core';
import { PocketbaseService } from 'src/app/pocketbase.service';
import { shoppingData } from 'src/app/shared/shopping-data';
import { SilasService } from 'src/app/silas.service';
import {Product} from '../../shared/product.model'

@Component({
  selector: 'app-best-selling-products',
  templateUrl: './best-selling-products.component.html',
  styleUrls: ['./best-selling-products.component.css']
})
export class BestSellingProductsComponent{

  products: any;

  constructor(private silasProductService: SilasService, private database: PocketbaseService){}

  ngOnInit(): void {
    this.database.getPocketBaseData().then(data =>{
      this.products = data.items.slice(0,4)
    })
  }

  starNum(n: number): Array<number> {
    return Array(n);
  }

}
