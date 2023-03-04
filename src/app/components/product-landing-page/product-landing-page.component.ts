import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PocketbaseService } from 'src/app/pocketbase.service';
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
  selectedProduct: any;

  landingProduct: any;
  relatedProducts: any;

  constructor(private activatedRoute: ActivatedRoute, private silasProductService: SilasProductServiceService,private database: PocketbaseService){}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data =>{
      this.database.viewPocketBaseData(data['id']).then(info =>{
        console.log(info)
        this.selectedProduct = info;
      })
    })
    this.database.getPocketBaseData().then(data=>{
      this.relatedProducts=data.slice(0,3);
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


}
