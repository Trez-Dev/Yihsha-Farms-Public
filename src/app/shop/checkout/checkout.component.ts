import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { orderAcceptAnimation } from 'src/app/animations/animations';
import { MyErrorStateMatcher } from 'src/app/login-page/sign-up/sign-up.component';
import { PocketbaseService } from 'src/app/pocketbase.service';
import { Address, AddressOnly, ProductsPurchased } from 'src/app/shared/address.model';
import { SilasService } from 'src/app/silas.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  animations: [ orderAcceptAnimation ]
})
export class CheckoutComponent implements OnInit{

  @ViewChildren("subTotalWrap")
  subTotalItems!: QueryList<ElementRef>;
  @ViewChildren("subTotalWrap_existing")subTotalItems_existing!: QueryList<ElementRef>;

  public payPalConfig ? : IPayPalConfig;
  showSuccess: boolean = false;
  addressData = new Address('','','','','','','','','','');
  customerLog: any;

  UserFormControl = new FormControl('', [Validators.required, Validators.email]);
  AddressFormControl = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();

  constructor(private silas: SilasService, private database: PocketbaseService){}
 
  ngOnInit(): void {
    this.silas.loadCart();
    this.items = this.silas.getItems();
    console.log(this.items)
    this.initConfig();
    if(JSON.parse(localStorage.getItem('address')!)){
      this.addressData=JSON.parse(localStorage.getItem('address')!)
    }
  }

  items: any = [];
  itemsPurchased: any = [];
  productsPurchased: ProductsPurchased[]= [];


  //----- calculate total
  get total() {
    const shippingCost = 50;
    return this.items.reduce((sum: any, x: any) => (
      {
        quantity: 1,
        price: sum.price + x.quantity * x.price
      }),
      { 
      quantity: 1, 
      price: 0
      }).price + shippingCost;
  }

   //----- remove specific item
   removeFromCart(item: any) {
    this.silas.removeItem(item);
    this.items = this.silas.getItems();
  }

   //----- clear cart item
   clearCart(items: any) {
    // this.items.forEach((item: any, index: any) => this.silas.removeItem(index));
    this.silas.clearCart(items);
    this.items = [...this.silas.getItems()];

  }


  private initConfig(): void {
    this.items.forEach((item: any) => {
      const cartItem = {
        name: item.name,
        quantity: item.quantity,
        category: 'PHYSICAL_GOODS',
        unit_amount: {
          currency_code: 'USD',
          value: `${item.price}`,
        },
      }
      this.itemsPurchased.push(cartItem);
     const purchasedItem = new ProductsPurchased(item.image,item.name,item.price,item.quantity, `$${item.price * item.quantity}`, `$${this.total}`)
     this.productsPurchased.push(purchasedItem);
    })
    this.payPalConfig = {
    currency: 'USD',
    clientId: environment.PAYPAL_CLIENT_ID,
    createOrderOnClient: (data) => <ICreateOrderRequest>{
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: `${this.total}`,
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: `${this.total}`
              }
            }
          },
          items: this.itemsPurchased
        }
      ]
    },
    advanced: {
      commit: 'true'
    },
    style: {
      label: 'paypal',
      layout: 'vertical'
    },
    onApprove: (data, actions) => {
      console.log('onApprove - transaction was approved', data, actions);
      actions.order.get().then((details: any) => {
        console.log('onApprove - you can get full order details inside onApprove: ', details);
        this.customerLog = {
          email_address: this.addressData.email,
          first_name: this.addressData.firstName,
          last_name: this.addressData.lastName,
          user_id: JSON.parse(localStorage.getItem('userId')!).userId,
          purchase_time: details.create_time,
          products_purchased: JSON.stringify(this.productsPurchased),
          phone_number: this.addressData.phone,
          shipping_address: JSON.stringify(
            new AddressOnly(
              this.addressData.address1,
              this.addressData.address2,
              this.addressData.city,
              this.addressData.state,
              this.addressData.zipCode))
        }
      })
    },
    onClientAuthorization: (data) => {
      console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      this.database.addCustomerLog(this.customerLog).then(() => console.log("Customer Log Added")).catch(() => console.log("Error Customer log not added :("));
      this.showSuccess = true;
      setTimeout(() => {
        this.showSuccess = false;
      }, 10000);
    },
    onCancel: (data, actions) => {
      console.log('Purchase Cancelled!', data, actions);
    },
    onError: err => {
      console.log('Error', err);
    },
    onClick: (data, actions) => {
      console.log('Clicked', data, actions);
    },
  };
  }
}
