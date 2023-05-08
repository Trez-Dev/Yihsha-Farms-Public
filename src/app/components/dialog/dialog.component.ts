import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PocketbaseService } from 'src/app/pocketbase.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SilasService } from 'src/app/silas.service';
import { Address } from 'src/app/shared/address.model';
import { FormControl, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from 'src/app/login-page/sign-up/sign-up.component';
import { InventoryProduct } from 'src/app/shared/product.model';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit{

constructor(public dialogRef: MatDialogRef<DialogComponent>, 
  @Inject(MAT_DIALOG_DATA) public data : string, 
  private database: PocketbaseService, 
  private snackbar: MatSnackBar,
  private router: Router,
  private silas: SilasService){}

inputData: any = this.data;
addProduct: boolean | undefined;
deleteProduct: boolean | undefined;
yourOrders: boolean | undefined;
previousOrders: boolean | undefined;
paymentMethods: boolean | undefined;
logout: boolean | undefined;
background: boolean | undefined;
profile: boolean | undefined;
address: boolean | undefined;
imageBlobUrl: any[] = [];
backgroundImagesLoad: boolean = true;

imageUrl: URL | undefined;
productType: string ='';
productName: string ='';
productPrice: number | undefined;
starNumber: number | undefined;
productDescription: string ='';
productnventory: number = 1;
inventoryAmount: any;
discountPercentage: number = 0

pocketData: any;
profileLoad: boolean = true;
discount: boolean = false;

products: any;
selectedId: string = '';
addressId: string ='';

// for funzies!
randomNum: any;
// for funzies!

UserFormControl = new FormControl('', [Validators.required, Validators.email]);
AddressFormControl = new FormControl('', [Validators.required]);

matcher = new MyErrorStateMatcher();
addressData = new Address('','','','','','','','','','');

backgroundImages = [
  {
    image: 'https://ik.imagekit.io/qb5fs9jxh/Background/lukasz-niescioruk-LHgq4S_Zk2w-unsplash.jpg?updatedAt=1678753086979'
  },
  {
    image: 'https://ik.imagekit.io/qb5fs9jxh/Background/5026563.jpg?updatedAt=1678753107533'
  },
  {
    image: 'https://ik.imagekit.io/qb5fs9jxh/Background/3185113.jpg?updatedAt=1678753107795'
  },
  {
    image: 'https://ik.imagekit.io/qb5fs9jxh/Background/26180.jpg?updatedAt=1678753108367'
  },
  {
    image: 'https://ik.imagekit.io/qb5fs9jxh/Background/BG-8.jpg?updatedAt=1678753108020'
  },
  {
    image: 'https://ik.imagekit.io/qb5fs9jxh/Background/5590822.jpg?updatedAt=1678753111181'
  },
  {
    image: 'https://ik.imagekit.io/qb5fs9jxh/Background/leecoy-bg-flowers.jpeg?updatedAt=1678756515397'
  },
  {
    image: 'https://ik.imagekit.io/qb5fs9jxh/Background/landing-image.jpg?updatedAt=1678756672260'
  },
  {
    image: 'https://ik.imagekit.io/qb5fs9jxh/Background/spices-166903.jpg?updatedAt=1678756691804'
  },
]


names = [this.inputData.name,'Alisson Werner', 'Ariel Ochoa', 'Spencer Stevens', 'Royce Wilkinson', 'Triston Hernandez,', 'Kieran Cuevas', 'Cayden Cooper', 'Gabriella Wiggins', 'Bennett Cooke', 'Angie Wilkerson', 'Zaria Powell'];



ngOnInit(): void {
  this.addressData.userId = JSON.parse(localStorage.getItem('userId') || `{"userId":""}`).userId
  this.database.getAllProducts().then(data => {
    this.products = data;
    console.log(data)
  })
  if(this.inputData.selected === 'AP'){
    this.addProduct = true;
  }
  if(this.inputData.selected === 'DP'){
    this.deleteProduct = true;
  }
  if(this.inputData.selected === 'AD'){
    this.address = true;
  }
  if(this.inputData.selected === 'logout'){
    this.logout = true
  }
  if(this.inputData.selected === 'background'){
    this.background = true
  }
  if(this.inputData.selected === 'profile'){
    this.profile = true
  }

  this.database.viewUserAddress(this.addressData.userId).then(data => {
    this.addressId = data.id;
    this.addressData = data;
  }).catch(() => console.log("No address Present"))

  for(let i = 0; i < this.names.length; i++){
    this.silas.getUserAvatar(this.names[i]).subscribe(avatar => {
      this.createImageFromBlob(avatar);
      this.profileLoad = false;
    });
  }
}

setBackgroundImage(imageUrl: string){
  localStorage.setItem('background', imageUrl);
}

setprofile(image: any){
  localStorage.setItem('profileImage', `{"image":${JSON.stringify(image)}}`);
}

addAddress(){
  this.database.addUserAddress(this.addressData).then(() =>{
    this.snackbar.open("Address Added!", "Clear");
});
}
clearAddress(){ 
  this.addressData = new Address('','','','','','','','','','');
  this.database.deleteUserAddress(this.addressId).then(() =>{
    this.snackbar.open("Address Deleted", "Clear");
});
}

addProductToDatabase(){
this.pocketData = {
  image: this.imageUrl,
  type: this.productType,
  name: this.productName,
  price: this.productPrice,
  star: this.starNumber,
  description: this.productDescription,
  inventory: this.productnventory
}

this.database.publishPocketBaseData(this.pocketData,)
.then(()=> {
this.randomNum = Math.floor((Math.random() * 3) + 1)
    if(this.randomNum === 1){
      this.snackbar.open('Product Added!, Yay! (⌒▽⌒）,', 'Go Away!')
    }
    if(this.randomNum === 2){
      this.snackbar.open("Product marching with the army! (/◕ヮ◕)/, (Means you added it :D)", "Go Away!")
    }
    if(this.randomNum === 3){
      this.snackbar.open("Product  in your shop ma'am ^_^,", "Go Away!")
    }
})
.catch(() => {
  this.snackbar.open("Error!, something must have went Wrong ಠ_ಠ :( (ps: Don't Bother Silas!)", 'Dismiss')
});
}

DeleteProductFromDatabase(){
  this.database.deletePocketBaseData(this.selectedId)
  .then(()=> {
    this.randomNum = Math.floor((Math.random() * 3) + 1)
    if(this.randomNum === 1){
      this.snackbar.open("Product Deleted!, Can't go back now! >:D", "Go Away!")
    }
    if(this.randomNum === 2){
      this.snackbar.open("Product discombobulated! (x_x) , You Killed it T_T! >:D", "Go Away!")
    }
    if(this.randomNum === 3){
      this.snackbar.open("Product vanished!, where did it go? ion know ¯\_(ツ)_/¯ ... lul", "Go Away!")
    }
  })
  .catch(() => {
    this.snackbar.open("Error!, something must have went Wrong ಠ_ಠ :( (ps: Don't Bother Silas!)", 'Go Away!')
  })
}

updateInventory(inventoryAmount: string){
  this.database.viewPocketBaseData(this.selectedId).then(data => {
    const inventoryUpdate = new InventoryProduct(data.image,data.type,data.star,data.name,data.price,data.description,parseInt(inventoryAmount), data.discount)
    this.database.updateProductInventory(this.selectedId,inventoryUpdate).then(() => {
      this.snackbar.open('Inventory Updatad', 'Dismiss')
    }).catch(() => {
      this.snackbar.open('Opps, Somthing went wrong :(', 'Dismiss')
    });
  }).catch(() => console.log("View data Error"));
}

updateDiscount(discountPercentage: string){
  this.database.viewPocketBaseData(this.selectedId).then(data => {
    const inventoryUpdate = new InventoryProduct(data.image,data.type,data.star,data.name,data.price,data.description,data.inventory, parseInt(discountPercentage))
    this.database.updateProductInventory(this.selectedId,inventoryUpdate).then(() => {
      this.snackbar.open('Discount Updated', 'Dismiss')
    }).catch(() => {
      this.snackbar.open('Opps, Somthing went wrong :(', 'Dismiss')
    });
  }).catch(() => console.log("View data Error"));
}

updatePrice(price: string){
  this.database.viewPocketBaseData(this.selectedId).then(data => {
    const inventoryUpdate = new InventoryProduct(data.image,data.type,data.star,data.name,price,data.description,data.inventory, data.discount)
    console.log(inventoryUpdate)
    this.database.updateProductInventory(this.selectedId,inventoryUpdate).then(() => {
      this.snackbar.open('Price Changed', 'Dismiss')
    }).catch(() => {
      this.snackbar.open('Opps, Somthing went wrong :(', 'Dismiss')
    });
  }).catch(() => console.log("View data Error"));
}

updateDetails(image: string, name: string, star: string, description: string){
  this.database.viewPocketBaseData(this.selectedId).then(data => {
    const inventoryUpdate = new InventoryProduct(image,data.type,parseInt(star),name,data.price,description,data.inventory, data.discount)
    console.log(inventoryUpdate)
    this.database.updateProductInventory(this.selectedId,inventoryUpdate).then(() => {
      this.snackbar.open('Details Changed', 'Dismiss')
    }).catch(() => {
      this.snackbar.open('Opps, Somthing went wrong :(', 'Dismiss')
    });
  }).catch(() => console.log("View data Error"));
}

logOut(){
  localStorage.clear();
  this.router.navigate(["/home"]);
}

createImageFromBlob(image: Blob) {
  let reader = new FileReader();
  reader.addEventListener("load", () => {
   this.imageBlobUrl.push(reader.result);
  }, false);
if (image) {
    reader.readAsDataURL(image);
  }
}

onBackgroundImagesLoad(){
  this.backgroundImagesLoad = false;
}

onProfileLoad(){
  this.profileLoad = false;
}
}
