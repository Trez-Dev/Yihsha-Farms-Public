import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Post } from './post';
import { Router } from '@angular/router';
import { Product } from './shared/product.model';

@Injectable({
  providedIn: 'root'
})
export class SilasProductServiceService {

  constructor(private http: HttpClient, private router: Router) { }

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

  public navigateToProduct(product: Product){
    this.router.navigate(['/product-landing'],{queryParams: {product: JSON.stringify(product)}})
}
}
