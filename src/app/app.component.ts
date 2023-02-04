import { Component } from '@angular/core';
import { RESTAPIServiceService } from './restapiservice.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Yihsha Farms';
  status: boolean = false;

  constructor(private restapiservice: RESTAPIServiceService, private router: Router ){}

  ngOnInit() {
    this.restapiservice.getPokiData().subscribe(data => {
      console.log(data);
    })
  }
  
}
