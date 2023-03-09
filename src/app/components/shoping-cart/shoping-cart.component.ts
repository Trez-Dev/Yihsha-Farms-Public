import { Component, DoCheck, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SilasProductServiceService } from 'src/app/silas-product-service.service';

@Component({
  selector: 'app-shoping-cart',
  templateUrl: './shoping-cart.component.html',
  styleUrls: ['./shoping-cart.component.css']
})
export class ShopingCartComponent implements DoCheck{

  constructor(private router: Router, private silasService: SilasProductServiceService){}

  navigateToShop(){
    this.router.navigate(['/shop']);
  }

  cartStatus: boolean = false;

  ngDoCheck(): void{
    this.cartStatus = this.silasService.hideShop();
    if(this.cartStatus){
      localStorage.getItem('shoping-cart')
    }
  }

}
