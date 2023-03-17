import { Component, DoCheck, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { SilasService } from './silas.service'; 
import { ActivatedRoute, ChildrenOutletContexts, Router } from '@angular/router';
import { Product } from './shared/product.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { PocketbaseService } from './pocketbase.service';
import { trigger,state,style,animate,transition } from '@angular/animations';
import { slideInAnimation } from './animations/animations';

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
        display: 'none'
      })),
      transition('open => closed', [
        animate('0.1s ease-in-out')
      ]),
      transition('open => closed', [
        animate('0.1s ease-in-out')
      ])
    ]),
  ]
})


export class AppComponent implements OnInit, DoCheck{
  @ViewChildren("subTotalWrap")
  subTotalItems!: QueryList<ElementRef>;
  @ViewChildren("subTotalWrap_existing")subTotalItems_existing!: QueryList<ElementRef>;
  title = 'Yihsha Farms';

  cartState: boolean = false;
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
  quantity: number = 0;

  items: any = [];

  userLogin: any;

  constructor(private dialogbox: MatDialog, 
    private database: PocketbaseService,
    private silas: SilasService,
    private router: Router,
    private contexts: ChildrenOutletContexts){}


  ngOnInit() {

    this.handleRedirect();

    this.cart = localStorage.getItem('shoping-cart');
     
    
    console.log(this.cartItems)

    this.userLogin = JSON.parse(localStorage.getItem('user-login') || '{"image":"../assets/images/user.png","loginStatus":false}');
    
    if (this.cart != null) {
      this.cartStatus = true;
      this.cartItems = (JSON.parse(this.cart)).productDetails;
      this.quantity =(JSON.parse(this.cart)).quantity;
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

    this.silas.loadCart();
    this.items = this.silas.getItems();
  } 

  ngDoCheck(): void {
    this.currentRoute = this.router.url;
  }

  toggle(){
    this.cartState = !this.cartState;
  }

  getRouteAnimationData() {
    return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
  }

  //----- calculate total
  get total() {
    return this.items.reduce(
      (sum: any, x: any) => ({
        quantity: 1,
        price: sum.price + x.quantity * x.price
      }),
      { quantity: 1, price: 0 }
    ).price;
  }

   //----- remove specific item
   removeFromCart(item: any) {
    this.silas.removeItem(item);
    this.items = this.silas.getItems();
  }

   //----- clear cart item
   clearCart(items: any) {
    // this.items.forEach((item, index) => this.cartService.removeItem(index));
    this.silas.clearCart(items);
    this.items = [...this.silas.getItems()];
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
