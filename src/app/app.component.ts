import { Component, OnInit } from '@angular/core';
import { SilasService } from './silas.service'; 
import { Router } from '@angular/router';
import { Product } from './shared/product.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { PocketbaseService } from './pocketbase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'Yihsha Farms';
  status: boolean = false;
  hide: boolean = false;
  loginStatus: boolean = false;

  cartStatus: boolean = false;
  cartItems: any;
  cart: any;
  userName: string = '';
  imageBlobUrl: any;
  // user: any;
  userId: any;



  userLogin: any;

  constructor(private dialogbox: MatDialog, 
    private database: PocketbaseService,
    private silas: SilasService){}


  ngOnInit() {
    this.cart = localStorage.getItem('shoping-cart');
     
    this.cartItems = JSON.parse(this.cart);

    this.userLogin = JSON.parse(localStorage.getItem('user-login') || '{"image":"../assets/images/user.png","loginStatus":false}');
    this.database.viewUserData(this.userLogin['id']).then((data) => {
      this.silas.getUserAvatar(data['name']).subscribe(avatar => {
        this.createImageFromBlob(avatar);
      })
    })
    if (this.cart != null) {
      this.cartStatus = true;
    }
    if (this.userLogin.loginStatus == false){
      this.loginStatus = false;
    }else{
      this.loginStatus = true;
    }
  } 
  
  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageBlobUrl = reader.result;
    }, false);
  if (image) {
      reader.readAsDataURL(image);
    }
  }
  
  hideShop(){
  this.hide = !this.hide 
  console.log(`${this.cartStatus}`);
  }

  clearShoppingCart(){
    localStorage.removeItem('shoping-cart');
    window.location.reload();
  }

  logOut(enterAnimationDuration: string, exitAnimationDuration: string){
    this.dialogbox.open(DialogComponent,{
      enterAnimationDuration,
      exitAnimationDuration,
      data: {title: 'Are You Sure?', selected: "logout"}
    })
  }
}
