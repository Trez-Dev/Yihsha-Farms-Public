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

  pocketBase: any = new PocketBase('http://127.0.0.1:8090');

  public async getPocketBaseData(){
    const records = await this.pocketBase.collection('products').getFullList(200, {
      sort: '-created',
  });
    return records
  }

  public async publishPocketBaseData(pocketData: any){
    const record = await this.pocketBase.collection('products').create(pocketData)
    return !!record;
  }

  public async deletePocketBaseData(selectedID: string | undefined){
    const record = await this.pocketBase.collection('products').delete(selectedID);
    return !!record;
  }
}
