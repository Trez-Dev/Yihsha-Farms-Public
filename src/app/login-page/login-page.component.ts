import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../components/dialog/dialog.component';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  constructor(public dialogBox: MatDialog){}

  dialogtitle: string | undefined;
  dalogDescription: string | undefined;
  loginStatus: boolean = false;
  signUpStatus: boolean = false;

  userOptions = [
    {
      name: "Your Orders",
      description: "Track, return or buy",
    },
    {
      name: "Address",
      description: "Belle AireMeadows, Brown's Town P.O, St. Ann",
    },
    {
      name: "Previous Orders",
      description: "View and Manage",
    },
    {
      name: "Payment Methods",
      description: "View and Manage",
    },
    {
      name: "Add Product",
      description: "spice, groceries, juice, etc...",
    },
    {
      name: "Delete Product",
      description: "spice, groceries, juice, etc...",
    },
  ]

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, selectedOption: string){

    if (selectedOption === 'YO'){
      this.dialogtitle = 'Your Orders'
    }
    if(selectedOption === 'AD'){
      this.dialogtitle = 'Address'
    }
    if(selectedOption === 'PO'){
      this.dialogtitle = 'Previous Orders'
    }
    if(selectedOption === 'PM'){
      this.dialogtitle = 'Payment Methods'
    }
    if(selectedOption === 'AP'){
      this.dialogtitle = 'Add Product'
    }
    if(selectedOption === 'DP'){
      this.dialogtitle = 'Delete Product'
    }

    this.dialogBox.open(DialogComponent,{
      enterAnimationDuration,
      exitAnimationDuration,
      data: {title: this.dialogtitle, selected: selectedOption}
    })

  }
}





