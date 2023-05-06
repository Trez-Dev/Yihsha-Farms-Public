import { Component, OnInit } from '@angular/core';
import { Route, Router, UrlHandlingStrategy } from '@angular/router';
import { PocketbaseService } from 'src/app/pocketbase.service';
import { InventoryProduct } from 'src/app/shared/product.model';

@Component({
  selector: 'app-offerings',
  templateUrl: './offerings.component.html',
  styleUrls: ['./offerings.component.css']
})
export class OfferingsComponent implements OnInit{

constructor(private database: PocketbaseService){}

offerings: any;

  ngOnInit(): void {
    this.database.getPocketBaseData().then(data => {
      this.offerings = data.items.filter((product: any) => product.type === 'Bundles');
    });
    // this.offerings = [
    //   {
    //     name: "Farm Fresh Vegetables",
    //     description: "Ut sollicitudin quam vel purus tempus, vel eleifend felis varius.",
    //     image: "../../../assets/images/Onion-PNG.png",
    //   },
    //   {
    //     name: "Farm Fresh Peppers",
    //     description: "Aliquam porta justo nibh, id laoreet sapien sodales vitae justo.",
    //     image: "../../../assets/images/Pepper.png",
    //   },
    //   {
    //     name: "Farm Fresh Spices",
    //     description: "Phasellus sed urna mattis, viverra libero sed, aliquam est.",
    //     image: "../../../assets/images/all-spice-Pimento-whole.png",
    //   },
    // ]
  }


}
