import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PocketbaseService } from 'src/app/pocketbase.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit{
constructor(public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data : string, private database: PocketbaseService, private snackbar: MatSnackBar){}

inputData: any = this.data;
addProduct: boolean | undefined;
deleteProduct: boolean | undefined;

imageUrl: URL | undefined;
productType: string | undefined;
productName: string | undefined;
productPrice: number | undefined;
starNumber: number | undefined;
pocketData: any;

products: any;
selectedId: string | undefined;

// for funzies!
randomNum: any;
// for funzies!

ngOnInit(): void {
  this.database.getPocketBaseData().then(data => {
    this.products = data;
    console.log(this.products)
  })
  console.log(this.data)
  if(this.inputData.selected === 'AP'){
    this.addProduct = true;
  }
  if(this.inputData.selected === 'DP'){
    this.deleteProduct = true;
  }
}


addProductToDatabase(){
this.pocketData = {
  image: this.imageUrl,
  type: this.productType,
  name: this.productName,
  price: this.productPrice,
  star: this.starNumber
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
  console.log(this.selectedId)
}
}
