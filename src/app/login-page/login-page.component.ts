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
    private activatedRoute: ActivatedRoute,
    private database: PocketbaseService){}

  dialogtitle: string | undefined;
  dalogDescription: string | undefined;
  imageBlobUrl: any;
  background: string = '';
  adminStatus: boolean | undefined;


  userData: any = new User ('../../assets/images/silas-bg2.jpg','../../assets/images/user.png','Silas Coley','User');


  ngOnInit(){
    this.activatedRoute.params.subscribe(data => {
      this.background = localStorage.getItem('background') || 'https://ik.imagekit.io/qb5fs9jxh/Background/leecoy-bg-flowers.jpeg?updatedAt=1678756515397';
      if(data['id'] === '00ifxtvzg3sb5kj'){
        this.userData = new User(this.background,'../../assets/images/IMG_0957.jpeg','Silas Coley','SilasColey');
        localStorage.setItem('user-login','{"image":"../assets/images/IMG_0957.jpeg","id":"00ifxtvzg3sb5kj"}');
        this.adminStatus = true;
      }else if(data['id'] === 'tomx74rtyrpvtl0'){
        this.userData = new User(this.background,'../../assets/images/leecoy-img.jpeg','Leecoy Coley','LeecoyColey');
        localStorage.setItem('user-login','{"image":"../assets/images/leecoy-img.jpeg","id":"tomx74rtyrpvtl0"}');
        this.adminStatus = true;
      } else {
        this.database.viewUserData(data['id']).then((data) => {
          this.silas.getUserAvatar(data['name']).subscribe(avatar => {
            this.createImageFromBlob(avatar);
            this.userData = new User(this.background,'',data['name'],data['username']);
            localStorage.setItem('user-login',`{"id":"${data['id']}"}`);
            this.adminStatus = false
          })
        })
        // this.userData = new User('')
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

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.imageBlobUrl = reader.result;
    }, false);
  if (image) {
      reader.readAsDataURL(image);
    }
  }

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
    if(selectedOption === 'Background'){
      this.dialogtitle = 'Select a Background'
    }

    this.dialogBox.open(DialogComponent,{
      enterAnimationDuration,
      exitAnimationDuration,
      data: {title: this.dialogtitle, selected: selectedOption}
    })

  }
}





