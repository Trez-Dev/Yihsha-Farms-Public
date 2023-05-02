export class Product {
    constructor(public image: string, 
      public type: string,
      public star: number, 
      public name: string, 
      public price: string) {}
}

export class InventoryProduct{
  constructor(
      public image: string, 
      public type: string,
      public star: number, 
      public name: string, 
      public price: string,
      public description: string,
      public inventory: number,
      public discount: number
  ){

  }
}