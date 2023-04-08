import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Post } from './post';
import { Router } from '@angular/router';
import { Product } from './shared/product.model';

import PocketBase, { Record } from 'pocketbase';

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

  //Important Variables
  redirectUrl: string = 'http://localhost:4200/redirect';

  pocketBase: any = new PocketBase('http://127.0.0.1:8090');


  public async loginWithGoogle() {
    const result = await this.pocketBase.collection('users').listAuthMethods();
    const authProvider = result.authProviders.find((x: { name: string; }) => x.name === 'google') || {
        authUrl: 'google'
      };
      localStorage.setItem('provider', JSON.stringify(authProvider));
      window.location.href = authProvider.authUrl + this.redirectUrl;
  }

  public async loginWithFacebook() {
    const result = await this.pocketBase.collection('users').listAuthMethods();
    const authProvider = result.authProviders.find((x: { name: string; }) => x.name === 'facebook') || {
        authUrl: 'facebook'
      };
      localStorage.setItem('provider', JSON.stringify(authProvider));
      window.location.href = authProvider.authUrl + this.redirectUrl;
  }

  public async confirmGoogleLogin() {
    const params = new URL(window.location as unknown as URL | string).searchParams;
    const provider = JSON.parse(localStorage.getItem('provider') || '{}');
    const authData = await this.pocketBase
      .collection('users')
      .authWithOAuth2(provider.name, params.get('code'), provider.codeVerifier, this.redirectUrl);
      if (authData.token) {
        this.router.navigate([`/user-page/${this.pocketBase.authStore.model.id}`])
        setTimeout(()=>{
          window.location.reload();
        }, 1000)
      }
  }

  public async adminAuth(adminEmail: string, adminPassword: string){
    const admin = await this.pocketBase.admins.authWithPassword(adminEmail,adminPassword)
    return this.pocketBase.authStore.model.id
  }

  public async userAuth(userEmail: string, userPassword: string){
    const user = await this.pocketBase.collection('users')
      .authWithPassword(userEmail, userPassword)
    return this.pocketBase.authStore.model.id
  }

  public async userSignIn(userData: any){
    const user = await this.pocketBase.collection('users')
      .create(userData)
    return !!user
  }

  public async getPocketBaseData(){
    const records = await this.pocketBase.collection('products')
      .getFullList(200, {sort: '-created'});
    return records
  }
  
  public async viewPocketBaseData(recordId: string): Promise<any>{
    const record = await this.pocketBase.collection('products')
      .getOne(recordId)
    return record
  }

  public async viewUserData(userId: string): Promise<any>{
    const record = await this.pocketBase.collection('users')
    .getOne(userId, { '$autoCancel': false })
    return record;
  }


  public async publishPocketBaseData(pocketData: any){
    const record = await this.pocketBase.collection('products')
      .create(pocketData)
    return !!record;
  }

  public async deletePocketBaseData(selectedID: string | undefined){
    const record = await this.pocketBase.collection('products')
      .delete(selectedID);
    return !!record;
  }
}
