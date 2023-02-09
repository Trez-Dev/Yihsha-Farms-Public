import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { shoppingData } from 'src/app/shared/shopping-data';
import { SilasProductServiceService } from 'src/app/silas-product-service.service';
import { Product } from '../../shared/product.model';

@Component({
  selector: 'app-product-landing-page',
  templateUrl: './product-landing-page.component.html',
  styleUrls: ['./product-landing-page.component.css']
})
export class ProductLandingPageComponent implements OnInit{

  selection: boolean = true;
  selectedProduct: Product | undefined;

  landingProduct: Product[] = shoppingData.filter(((Product, i) => i < 2))
  relatedProducts: Product[] = shoppingData.filter(((Product, i) => i < 3))

  constructor(private activatedRoute: ActivatedRoute, private silasProductService: SilasProductServiceService){}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(data =>{
      console.log(JSON.parse(data['product']))
      this.selectedProduct = JSON.parse(data['product'])
    })
    
  }


  starNum(n: number): Array<number> {
    return Array(n);
  }

  description(){
    this.selection = true;
  }

  reviews(){
    this.selection = false
  }

  navigateProductLanding(product: Product){
    this.silasProductService.navigateToProduct(product)
}


}
