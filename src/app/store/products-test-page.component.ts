import { Component } from "@angular/core";
import { Product } from "../shared/product.model";
import { ProductStore } from "./product.store";

@Component({
    selector: 'app-product-test',
    template: `<div class="background">
    <button (click)="addProductToState('New Product')">Add to state</button>
    <button (click)="addProductToBrowser('New Product')">Add to Browser Storage</button>
    <button (click)="viewProductFromBrowser('New Product')">View From Browser Storage</button>
    <button (click)="clearBrowserStorage()">Clear</button>
    <div class="gallery-item" *ngFor="let product of browserStorage">
            <a><img [src]="product.image"></a>
            <p>{{ product.type }}</p>
            <a><h1>{{ product.name }}</h1></a>
            <h2>{{ product.price }}</h2>
        </div>
    <li *ngFor="let product of (products$ | async)">
      {{ product.name }}
    </li>
    </div>
    `,
    styles: ['.background { height: 125vh; background-color: white; padding-top: 5rem}']
    , providers: [ProductStore]
})

export class ProductsPageComponent{
    constructor(private readonly productStore: ProductStore){}

    products$ = this.productStore.products$;
    browserStorage: any;
    products: string | undefined;
    productsArray: any; 

    clearBrowserStorage(){
        localStorage.clear()
    }

    addProductToBrowser(product: string){
        this.products$.subscribe(data => {
            console.log(data)
            this.products = JSON.stringify(data)
            localStorage.setItem('token', this.products)
        })
    }

    viewProductFromBrowser(product: string){
        this.productsArray = localStorage.getItem('token')
        this.browserStorage = JSON.parse(this.productsArray);
    }
    
    addProductToState(product: string){
        console.log(product)
        this.productStore.addProduct({image: '../../../assets/images/Easispice-All-Purpose-Seasoning-14.webp', 
                                       type: 'GROCORIES',
                                       star: 4,
                                       name: 'Easispice All Purpose Seasoning',
                                       price: '$950.00'})
    }
}