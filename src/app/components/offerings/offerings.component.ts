import { Component } from '@angular/core';
import { Route, Router, UrlHandlingStrategy } from '@angular/router';

@Component({
  selector: 'app-offerings',
  templateUrl: './offerings.component.html',
  styleUrls: ['./offerings.component.css']
})
export class OfferingsComponent {

  constructor(private router: Router){}

  offerings = [
    {
      name: "Farm Fresh Vegetables",
      description: "Ut sollicitudin quam vel purus tempus, vel eleifend felis varius.",
      image: "../../../assets/images/Onion-PNG.png"
    },
    {
      name: "Farm Fresh Peppers",
      description: "Aliquam porta justo nibh, id laoreet sapien sodales vitae justo.",
      image: "../../../assets/images/Pepper.png"
    },
    {
      name: "Farm Fresh Spices",
      description: "Phasellus sed urna mattis, viverra libero sed, aliquam est.",
      image: "../../../assets/images/all-spice-Pimento-whole.png"
    },
  ]

  navigateToShop(){
    this.router.navigate(['/shop'])
  }


}
