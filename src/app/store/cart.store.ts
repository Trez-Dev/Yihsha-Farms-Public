import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { Observable } from "rxjs";
import { Product } from "../shared/product.model";

export interface CartState{
    cartItems: Product[];
}

@Injectable()
export class CartStore extends ComponentStore<CartState>{
    constructor(){
        super({cartItems: []});
    }
    readonly cartItems$: Observable<Product[]> = this.select(state => state.cartItems); 
    readonly addCartItem = this.updater((state, cartItem: Product) => ({cartItems: [...state.cartItems, cartItem]}))
}