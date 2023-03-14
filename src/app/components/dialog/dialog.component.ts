import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PocketbaseService } from 'src/app/pocketbase.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

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
  private router: Router){}

inputData: any = this.data;
addProduct: boolean | undefined;
deleteProduct: boolean | undefined;
logout: boolean | undefined;
background: boolean | undefined;

imageUrl: URL | undefined;
productType: string ='';
productName: string ='';
productPrice: number | undefined;
starNumber: number | undefined;
productDescription: string ='';
pocketData: any;

products: any;
selectedId: string | undefined;

// for funzies!
randomNum: any;
// for funzies!

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

ngOnInit(): void {
  this.database.getPocketBaseData().then(data => {
    this.products = data;
    console.log(this.products)
  })
  if(this.inputData.selected === 'AP'){
    this.addProduct = true;
  }
  if(this.inputData.selected === 'DP'){
    this.deleteProduct = true;
  }
  if(this.inputData.selected === 'logout'){
    this.logout = true
  }
  if(this.inputData.selected === 'Background'){
    this.background = true
  }
}

setBackgroundImage(imageUrl: string){
  localStorage.setItem('background', imageUrl);
  window.location.reload();
}

addProductToDatabase(){
this.pocketData = {
  image: this.imageUrl,
  type: this.productType,
  name: this.productName,
  price: this.productPrice,
  star: this.starNumber,
  description: this.productDescription
}
this.database.publishPocketBaseData(this.pocketData)
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

logOut(){
  localStorage.clear();
  this.router.navigate(["/home"]);
  setTimeout(()=>{
    window.location.reload();
  }, 1000)
}
}
