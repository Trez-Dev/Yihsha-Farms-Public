import { Component } from '@angular/core';
import { shoppingData } from 'src/app/shared/shopping-data';
import {Product} from '../../shared/product.model'

@Component({
  selector: 'app-card-one',
  templateUrl: './card-one.component.html',
  styleUrls: ['./card-one.component.css']
})
export class CardOneComponent {

  products: Product[] = shoppingData.filter((Product, i) => i < 4)

  starNum(n: number): Array<number> {
    return Array(n);
  }

}
