import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Post } from './post';
import { Router } from '@angular/router';
import { Product } from './shared/product.model';

import PocketBase from 'pocketbase';

@Injectable({
  providedIn: 'root'
})
export class PocketbaseService {

  constructor(private http: HttpClient, private router: Router) { }

  httpOptions = {
    headers: new HttpHeaders ({
      'Content-Type': 'application/json'
    })
  };

  pb: any = new PocketBase('http://127.0.0.1:8090');

  public async getPocketBaseData(){
    const records = await this.pb.collection('products').getFullList(200, {
      sort: '-created',
  });
    return records
  }


}
