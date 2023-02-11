import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shoping-cart',
  templateUrl: './shoping-cart.component.html',
  styleUrls: ['./shoping-cart.component.css']
})
export class ShopingCartComponent {

  constructor(private router: Router){}

  navigateToShop(){
    this.router.navigate(['/shop'])
  }
}
