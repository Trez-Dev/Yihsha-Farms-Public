import { Component, OnInit } from '@angular/core';
import { PocketbaseService } from 'src/app/pocketbase.service';

@Component({
  selector: 'app-services-card',
  templateUrl: './services-card.component.html',
  styleUrls: ['./services-card.component.css']
})
export class ServicesCardComponent {

  bundles: any;

  constructor(private database: PocketbaseService){}

  // ngOnInit(): void {
  //   this.database.getPocketBaseData().then(data => {
  //     this.bundles = data.items.filter((product: any) => product.type === 'Seasonings');
  //   });
  // }

  services = [ 
    {
      name: "Free Shipping",
      about: "Above $5 only",
      icon: "fa fa-truck"
    },
    {
      name: "Certified Organic",
      about: "100% Guarantee",
      icon: "	fa fa-address-book"
    },
    {
      name: "Huge Savings",
      about: "At Lowest Price",
      icon: "fa fa-money"
    },
    
    {
      name: "Easy Returns",
      about: "No Questions Asked",
      icon: "fa fa-recycle"
    },
    
  ];

  starNum(n: number): Array<number> {
    return Array(n);
  }

}
