import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { SilasService } from 'src/app/silas.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{

  @ViewChildren("subTotalWrap")
  subTotalItems!: QueryList<ElementRef>;
  @ViewChildren("subTotalWrap_existing")subTotalItems_existing!: QueryList<ElementRef>;

  public payPalConfig ? : IPayPalConfig;
  showSuccess!: boolean;

  constructor(private silas: SilasService){}

  ngOnInit(): void {
    this.silas.loadCart();
    this.items = this.silas.getItems();

    this.initConfig();
  }

  items: any = [];

  //----- calculate total
  get total() {
    return this.items.reduce((sum: any, x: any) => (
      {
        quantity: 1,
        price: sum.price + x.quantity * x.price
      }),
      { 
      quantity: 1, 
      price: 0
      }).price;
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
    this.payPalConfig = {
    currency: 'USD',
    clientId: 'AU_gR6MotvbdS2NNxiJu7PlNu_5Rz2KIWV18upJWvxNzPEud-EQHFxoDxFgAy_SIK3vOZSVbS5vMpRBa',
    createOrderOnClient: (data) => <ICreateOrderRequest>{
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: '9.99',
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: '9.99'
              }
            }
          },
          items: [
            {
              name: 'Enterprise Subscription',
              quantity: '1',
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: 'USD',
                value: '9.99',
              },
            }
          ]
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
      console.log('onApprove - transaction was approved, but not authorized', data, actions);
      actions.order.get().then((details: any) => {
        console.log('onApprove - you can get full order details inside onApprove: ', details);
      });
    },
    onClientAuthorization: (data) => {
      console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      this.showSuccess = true;
    },
    onCancel: (data, actions) => {
      console.log('OnCancel', data, actions);
    },
    onError: err => {
      console.log('OnError', err);
    },
    onClick: (data, actions) => {
      console.log('onClick', data, actions);
    },
  };
  }
}
