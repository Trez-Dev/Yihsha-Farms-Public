export class Address {
    constructor(
      public userId: string,
      public firstName: string, 
      public lastName: string,
      public email: string,
      public address1: string, 
      public address2: string, 
      public city: string, 
      public state: string, 
      public zipCode: string,
      public phone: string) {}
}

export class AddressOnly{
  constructor(public adress: string,
    public address2: string,
    public city: string,
    public state: string,
    public zipCode: string
    ){}
}

export class ProductsPurchased{
  constructor(
    public image: string,
    public name: string,
    public price: string,
    public quantity: number,
    public subTotal: string,
    public total: string
    ){}
}

export class CustomerLog{
  constructor(
      public log: any,
      public id: string,
      public firstName: string, 
      public lastName: string,
      public email: string,
      public shippingAddress: AddressOnly,
      public phone: string,
      public purchaseTime: string,
      public productPurchased: ProductsPurchased[],
      public total: string,
      public orderStatus: boolean
    ){}
}