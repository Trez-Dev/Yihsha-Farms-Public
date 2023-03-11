import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { Product } from "../shared/product.model";
import { Observable } from "rxjs";
import { state } from "@angular/animations";
import { SilasProductServiceService } from "../silas-product-service.service";

export interface ProductState{
    products: Product[];
}

// Read state using select, combining selectors and view models 

// @Injectable()
// export class ProductStore extends ComponentStore<MoviesState>{

//     constructor(){
//         super({products:[], preferedProducts:[]});
//     }

//     readonly products$: Observable<Product[]> = this.select(state => state.products);
//     readonly preferedProductsIds$ = this.select(state => state.preferedProducts);

//     readonly preferedProducts$ = this.select(this.products$, this.preferedProductsIds$, (products, ids) => products.filter(product => ids.includes(product.name)));

//     private readonly vm$ = this.select({
//         products: this.products$,
//         preferedProductsIds:  this.preferedProductsIds$,
//         preferedProducts: this.preferedProducts$
//     })
// }

// Updating state using the updater method 

// @Injectable()
// export class ProductStore extends ComponentStore<MoviesState>{
//     constructor(){
//         super({products:[]});
//     }
//     readonly addProduct = this.updater((state, product: Product) => ({products: [...state.products, product]}))
// }


@Injectable()
export class ProductStore extends ComponentStore<ProductState>{
    constructor(){
        super({products:[]});
    }
    readonly products$: Observable<Product[]> = this.select(state => state.products);
    readonly addProduct = this.updater((state, product: Product) => ({products: [...state.products, product]}))
}

