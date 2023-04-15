import { AfterViewInit, Component, DoCheck, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from '../components/dialog/dialog.component';
import { PocketbaseService } from '../pocketbase.service';
import { Address } from '../shared/address.model';
import { User } from '../shared/user.model';
import { SilasService } from '../silas.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit{

  constructor(public dialogBox: MatDialog, 
    private silas: SilasService, 
    private activatedRoute: ActivatedRoute,
    private database: PocketbaseService,
    private router: Router){}

  dialogtitle: string | undefined;
  dalogDescription: string | undefined;
  imageBlobUrl: any;
  background: string = '';
  address = new Address('','','','','','','','','','');
  profile: any;
  adminStatus: boolean | undefined;
  backDropLoad: boolean = true;
  profileLoad: boolean = true;
  userOptions: any = [];
  userId: string = '';


  userData: any = new User ('../../assets/images/silas-bg2.jpg','../../assets/images/user.png','Silas Coley','User');


  ngOnInit(){
    this.activatedRoute.params.subscribe(data => {
      this.userId = data['id'];
      this.database.viewUserAddress(this.userId).then(data => {
        this.address = data;
      }).catch(() => {
       this.address = new Address('-----------','-----------','-----------','-----------','-----------','-----------','-----------','-----------','-----------','-----------')
      })
      this.background = localStorage.getItem('background') || 'https://ik.imagekit.io/qb5fs9jxh/Background/leecoy-bg-flowers.jpeg?updatedAt=1678756515397';
      if(data['id'] === environment.SILAS_ADMIN_ID){
        this.userData = new User(this.background,'../../assets/images/IMG_0957.jpeg','Silas Coley','SilasColey');
        localStorage.setItem('user-login',`{"image":"../assets/images/IMG_0957.jpeg","id":"${environment.SILAS_ADMIN_ID}"}`);
        this.adminStatus = true;
        this.profileLoad = false;
      }else if(data['id'] === environment.LECOY_ADMIN_ID){
        this.userData = new User(this.background,'../../assets/images/leecoy-img.jpeg','Leecoy Coley','LeecoyColey');
        localStorage.setItem('user-login',`{"image":"../assets/images/leecoy-img.jpeg","id":"${environment.LECOY_ADMIN_ID}"}`);
        this.adminStatus = true;
        this.profileLoad = false;
      } else {
        this.database.viewUserData(data['id']).then((data) => {
          localStorage.setItem('userId',`{"userId":"${data['id']}"}`)
          this.silas.getUserAvatar(data['name']).subscribe(avatar => {
            this.createImageFromBlob(avatar);
            this.userData = new User(this.background,'',data['name'],data['username']);
            localStorage.setItem('user-login',`{"id":"${data['id']}"}`);
            this.adminStatus = false;
            this.profileLoad = false;
          })
        })
      }
    })
    this.userOptions = [
      {
        name: "Your Orders",
        description: "Track, return or buy",
      },
      {
        name: "Shipping Address",
        description: ""
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
        name: "Inventory Management",
        description: "spice, groceries, juice, etc...",
      },
      {
        name: "Customer Orders",
        description: "Manage and Deliver",
      },
    ]
  }
  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
      this.profile = JSON.parse(localStorage.getItem('profileImage') || '{"profile":false}');
      if (this.profile.profile != false){
        this.imageBlobUrl = this.profile.image;
      }else{
        this.imageBlobUrl = reader.result;
      }
      localStorage.setItem('user-profile-image',`{"image":${JSON.stringify(this.imageBlobUrl)}}`)
    }, false);
      if (image) {
          reader.readAsDataURL(image);
      }
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, selectedOption: string){

    if (selectedOption === 'YO'){
      this.dialogtitle = 'Your Orders Comming Soon!'
    }
    if(selectedOption === 'AD'){
      this.dialogtitle = 'Input your Address'
    }
    if(selectedOption === 'PO'){
      this.dialogtitle = 'Previous Orders Comming Soon!'
    }
    if(selectedOption === 'PM'){
      this.dialogtitle = 'Payment Methods Comming Soon!'
    }
    if(selectedOption === 'AP'){
      this.dialogtitle = 'Add Product'
    }
    if(selectedOption === 'DP'){
      this.dialogtitle = 'Inventory Management'
    }
    if(selectedOption === 'background'){
      this.dialogtitle = 'Select a Background'
    }
    if(selectedOption === 'profile'){
      this.dialogtitle = 'Select a Profile Image'
    }
    this.dialogBox.open(DialogComponent,{
      enterAnimationDuration,
      exitAnimationDuration,
      data: {title: this.dialogtitle, selected: selectedOption, name: this.userData.name}
    }).afterClosed().subscribe(() => {
      this.userData.bg = localStorage.getItem('background') || 'https://ik.imagekit.io/qb5fs9jxh/Background/leecoy-bg-flowers.jpeg?updatedAt=1678756515397';
      this.database.viewUserAddress(this.userId).then(data => {
        this.address = data;
      }).catch(() => {
       this.address = new Address('-----------','-----------','-----------','-----------','-----------','-----------','-----------','-----------','-----------','-----------')
      })
      this.database.viewUserData(this.userId).then((data) => {
        this.silas.getUserAvatar(data['name']).subscribe({
          next: (avatar) => {
          this.createImageFromBlob(avatar);
          }, 
          error: () => {console.log("Error: No User Avatar")}
      })
      }).catch(() => console.log("Error: No User Avatar"))
    })

  }
  onBackdropLoad(){
    this.backDropLoad = false;
  }
  onProfileLoad(){
    this.profileLoad = false;
  }

  logNav(){
    this.router.navigate([`/logs/${this.userId}`])
  }

  userLogNav(logType: string){
    this.router.navigate([`/logs/${logType}/${this.userId}`])
  }
  
}





