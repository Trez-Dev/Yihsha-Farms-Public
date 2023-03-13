import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DialogComponent } from '../components/dialog/dialog.component';
import { PocketbaseService } from '../pocketbase.service';
import { User } from '../shared/user.model';
import { SilasService } from '../silas.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit{

  constructor(public dialogBox: MatDialog, 
    private silas: SilasService, 
    private activatedRoute: ActivatedRoute){}

  dialogtitle: string | undefined;
  dalogDescription: string | undefined;

  userData: any;

  // userData: User | any;

  ngOnInit(){
    this.activatedRoute.params.subscribe(data => {
      if(data['id'] === '00ifxtvzg3sb5kj'){
        this.userData = new User('../../assets/images/silas-bg2.jpg','../../assets/images/IMG_0957.jpeg','Silas Coley','SilasColey');
        localStorage.setItem('user-login','{"image":"../assets/images/IMG_0957.jpeg","id":"00ifxtvzg3sb5kj"}');
      }
      if(data['id'] === 'tomx74rtyrpvtl0'){
        this.userData = new User('../../assets/images/leecoy-bg-flowers.jpeg','../../assets/images/leecoy-img.jpeg','Leecoy Coley','LeecoyColey');
        localStorage.setItem('user-login','{"image":"../assets/images/leecoy-img.jpeg","id":"tomx74rtyrpvtl0"}');
      } else {
        
      }
    })
  }
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





