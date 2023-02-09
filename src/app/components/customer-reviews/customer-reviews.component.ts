import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-reviews',
  templateUrl: './customer-reviews.component.html',
  styleUrls: ['./customer-reviews.component.css']
})
export class CustomerReviewsComponent {

  constructor(private router: Router){}

  starNum(n: number): Array<number> {
    return Array(n);
  }

  navigateToShop(){
    this.router.navigate(['/shop'])
  }
}
