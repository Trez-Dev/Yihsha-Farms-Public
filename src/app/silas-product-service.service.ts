import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Post } from './post';
import { Router } from '@angular/router';
import { Product } from './shared/product.model';
import { PocketbaseService } from './pocketbase.service';

@Injectable({
  providedIn: 'root'
})
export class SilasProductServiceService {

  constructor(private http: HttpClient, private router: Router,private database: PocketbaseService) { }

  hide: boolean = false;

  httpOptions = {
    headers: new HttpHeaders ({
      'Content-Type': 'application/json'
    })
  };

  // postBlog(blog: any){
  //   let url = "http://localhost:3000/blogs";
  //   return this.http.post(url, blog, this.httpOptions);
  // }

  // public getPokiData(): Observable<any>{
  //   let pokiUrl = "https://pokeapi.co/api/v2/pokedex";
  //   let params = new HttpParams().set('count','248')
  //   return this.http.get(pokiUrl,{params})
  // }


  public navigateToProduct(productId: any){
    // this.router.navigate(['/product-landing'],{queryParams: {product: JSON.stringify(product)}})
    console.log(productId)
     this.router.navigate([`/product-landing/${productId}`])
}

  // public hideShop(): boolean{
  //   return this.hide = !this.hide;
  //   }
}
