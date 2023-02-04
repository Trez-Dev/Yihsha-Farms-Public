import { Component } from '@angular/core';

@Component({
  selector: 'app-services-card',
  templateUrl: './services-card.component.html',
  styleUrls: ['./services-card.component.css']
})
export class ServicesCardComponent {

  services = [ 
    {
      name: "Free Shipping",
      about: "Above $5 only",
      icon: "fas fa-truck"
    },
    {
      name: "Certified Organic",
      about: "100% Guarantee",
      icon: "far fa-address-book"
    },
    {
      name: "Huge Savings",
      about: "At Lowest Price",
      icon: "far fa-money-bill-alt"
    },
    
    {
      name: "Easy Returns",
      about: "No Questions Asked",
      icon: "fa fa-recycle"
    },
    
  ];

}
