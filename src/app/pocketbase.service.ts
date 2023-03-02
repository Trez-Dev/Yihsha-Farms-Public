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

  public async adminAuth(adminEmail: string, adminPassword: string){
    const admin = await this.pocketBase.admins.authWithPassword(adminEmail,adminPassword)
    console.log(this.pocketBase.authStore.isValid);
    return !!admin
  }

  public async userAuth(userEmail: string, userPassword: string){
    const user = await this.pocketBase.collection('users').authWithPassword(userEmail, userPassword)
    console.log(this.pocketBase.authStore.isValid);
    console.log(this.pocketBase.authStore.token);
    console.log(this.pocketBase.authStore.model.id);
    return !!user
  }

  public async userSignIn(userData: any){
    const user = await this.pocketBase.collection('users').create(userData)
    return !!user
  }

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
