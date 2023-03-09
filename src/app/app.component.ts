import { Component } from '@angular/core';
import { SilasProductServiceService } from './silas-product-service.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Yihsha Farms';
  status: boolean = false;
  hide: boolean = false;

  constructor(private silasService: SilasProductServiceService, private router: Router ){}

  ngOnInit() {
    // this.restapiservice.getPokiData().subscribe(data => {
    //   console.log(data);
    // })
  }
  
  hideShop(){
  this.hide = this.silasService.hideShop();
  }
}
