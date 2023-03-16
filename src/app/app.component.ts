import { Component, DoCheck, OnInit } from '@angular/core';
import { SilasService } from './silas.service'; 
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from './shared/product.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { PocketbaseService } from './pocketbase.service';
import { trigger,state,style,animate,transition } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('openShop', [
      state('open', style({
        opacity: '1',
      })),
      state('closed', style({
        transform: 'translateX(200px)',
        opacity: '0',
      })),
      transition('open => closed', [
        animate('0.1s ease-in-out')
      ]),
      transition('open => closed', [
        animate('0.1s ease-in-out')
      ])
    ])
  ]
})

export class AppComponent implements OnInit, DoCheck{
  title = 'Yihsha Farms';

  cartState: boolean = true;
  status: boolean = false;
  loginStatus: boolean = false;

  cartStatus: boolean = false;
  cartItems: any;
  cart: any;
  userName: string = '';
  imageBlobUrl: any;
  profile: any;
  userId: any;
  currentRoute: string = '';
  quantity: number = 0



  userLogin: any;

  constructor(private dialogbox: MatDialog, 
    private database: PocketbaseService,
    private silas: SilasService,
    private router: Router){}


  ngOnInit() {

    this.handleRedirect();

    this.cart = localStorage.getItem('shoping-cart');
     
    this.cartItems = (JSON.parse(this.cart)).productDetails;
    console.log(this.cartItems)
    this.quantity =(JSON.parse(this.cart)).quantity;

    this.userLogin = JSON.parse(localStorage.getItem('user-login') || '{"image":"../assets/images/user.png","loginStatus":false}');
    
    if (this.cart != null) {
      this.cartStatus = true;
    }
    if (this.userLogin.loginStatus == false){
      this.loginStatus = false;
    }else{
      this.loginStatus = true;
      this.database.viewUserData(this.userLogin['id']).then((data) => {
        this.silas.getUserAvatar(data['name']).subscribe(avatar => {
          this.createImageFromBlob(avatar);
        })
      })
    }
  } 

  ngDoCheck(): void {
    this.currentRoute = this.router.url;
  }

  toggle(){
    this.cartState = !this.cartState;
  }
  
  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.profile = JSON.parse(localStorage.getItem('profileImage') || '{"profile":false}');
      if (this.profile.profile != false){
        this.imageBlobUrl = this.profile.image;
      }else{
        this.imageBlobUrl = reader.result;
      }
    }, false);
  if (image) {
      reader.readAsDataURL(image);
    }
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

  handleRedirect = async () => {
    const params = new URL(window.location as unknown as string | URL).searchParams;
    const provider = localStorage.getItem('provider');

    if(params.get('code') && provider){
      await this.database.confirmGoogleLogin();
    }
  }
}
