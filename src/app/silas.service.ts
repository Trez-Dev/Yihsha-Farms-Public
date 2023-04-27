import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Post } from './post';
import { Router } from '@angular/router';
import { Product } from './shared/product.model';
import { PocketbaseService } from './pocketbase.service';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class SilasService {

  constructor(private http: HttpClient, private router: Router,private database: PocketbaseService) { }

  hide: boolean = false;
  items: any = [];

  httpOptions = {
    headers: new HttpHeaders ({
      'Content-Type': 'application/json'
    })
  };

  // postBlog(blog: any){
  //   let url = "http://localhost:3000/blogs";
  //   return this.http.post(url, blog, this.httpOptions);
  // }

  
  public getUserAvatar(userName: string){
    let multiAvatarUrl = `https://api.multiavatar.com/${userName}.png`;
    let params = new HttpParams().set('apikey', environment.AVATAR_API_KEY)
    return this.http.get(multiAvatarUrl, {responseType: 'blob', params})
  }


  public navigateToProduct(productId: any){
    // this.router.navigate(['/product-landing'],{queryParams: {product: JSON.stringify(product)}})
    console.log(productId)
     this.router.navigate([`/product-landing/${productId}`])
  }

  // public hideShop(): boolean{
  //   return this.hide = !this.hide;
  //   }

  addToCart(addedItem: any){
      this.items.push(addedItem);
      this.saveCart();
  }

  getItems(){
    return this.items;
  }

  loadCart(): void{
    this.items = JSON.parse(localStorage.getItem('cart-items')!) ?? [];
  }

  saveCart(): void{
    localStorage.setItem('cart-items', JSON.stringify(this.items));
  }

  clearCart(items: any){
    this.items=[]; 
    localStorage.removeItem('cart-items');
  }

  removeItem(item: any){
    const index = this.items.findIndex((data: { id: any; }) => data.id === item.id);

    if(index > -1){
      this.items.splice(index, 1);
      this.saveCart();
    }
  }

  itemUpdate(item: any, quantity: any){
    this.items.forEach((data: {id: any, quantity: any}) => {
      if(data.id === item.id){
        if (data.quantity > 1 || quantity == 1){
          data.quantity = quantity + data.quantity
        }
      }
    })
    this.saveCart();
  }

  itemInCart(item: any): boolean{
    return this.items.findIndex((data: { id: any; }) => data.id === item.id) > -1;
  }
}
