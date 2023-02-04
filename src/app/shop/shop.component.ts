import { Component } from '@angular/core';
import { shoppingData } from '../shared/shopping-data';
import { Product } from '../shared/product.model';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent {

  products: Product[] = shoppingData.filter((Product, i) => i < 9)

  starNum(n: number): Array<number> {
    return Array(n);
  }
}
