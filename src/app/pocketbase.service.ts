import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Post } from './post';
import { Router } from '@angular/router';
import { InventoryProduct, Product } from './shared/product.model';
import { environment } from 'src/environments/environment';

import PocketBase, { Record } from 'pocketbase';
import { Address, AddressOnly } from './shared/address.model';

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
  redirectUrl: string = environment.REDIRECT_URL;

  pocketBase: any = new PocketBase(environment.POCKETBASE_REST_API);



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

  public async confirmLogin() {
    const params = new URL(window.location as unknown as URL | string).searchParams;
    const provider = JSON.parse(localStorage.getItem('provider') || '{}');
    const authData = await this.pocketBase.collection('users')
      .authWithOAuth2(provider.name, params.get('code'), provider.codeVerifier, this.redirectUrl);
      if (authData.token) {
        this.pocketBase.collection('users').update(authData.record.id, {name: authData.meta.name})
        this.router.navigate([`/user-page/${this.pocketBase.authStore.model.id}`])
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
      .getList(1,9,{filter: 'inventory > 0',sort: '-created',  '$autoCancel': false });
    return records
  }

  public async getAllProducts(){
    const records = await this.pocketBase.collection('products')
    .getFullList(200, {sort: '-created'});
    return records
  }
  
  public async viewPocketBaseData(recordId: string): Promise<any>{
    const record = await this.pocketBase.collection('products')
      .getOne(recordId)
    return record;
  }

  public async updateProductInventory(productId: string, inventoryUpdate: any){
    const record = await this.pocketBase.collection('products')
      .update(productId,inventoryUpdate);
    return record;
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

  public async addCustomerLog(logData: any){
    const log = await this.pocketBase.collection('orders')
      .create(logData);
    return !!log;
  }

  public async getCustomerLogs(){
    const logs = await this.pocketBase.collection('orders')
    .getFullList();
  return logs;
  }

  public async getUserLogs(userId: string){
    const logs = await this.pocketBase.collection('orders')
    .getList(1,50, {filter: `user_id = "${userId}"`})
    return logs;
  }


  public async updateCustomerLog(logId: string, logData: any){
    const log = await this.pocketBase.collection('orders')
    .update(logId,logData);
    return !!log;
  }

  public async addUserAddress(address: Address){
    const record = await this.pocketBase.collection('shipping_address')
    .create(address);
    return !!record;
  }

  public async updateUserAddress(userId: string, address: Address){
    const record = await this.pocketBase.collection('shipping_address')
    .update(userId, address);
  }

  public async viewUserAddress(userId: string){
    const record = await this.pocketBase.collection('shipping_address')
    .getFirstListItem(`userId="${userId}"`);
    return record;
  }

  public async deleteUserAddress(recordId: string){
    const record = await this.pocketBase.collection('shipping_address')
    .delete(recordId);
    return record;
  }
}
