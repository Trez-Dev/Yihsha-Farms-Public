import { Component, OnInit } from '@angular/core';
import { MyErrorStateMatcher } from '../login/login.component';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { PocketbaseService } from 'src/app/pocketbase.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  hide: boolean = true;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  matcher = new MyErrorStateMatcher();

  constructor(private database: PocketbaseService, private snackbar: MatSnackBar){}

  username: string = '';
  email: string = '';
  emailVisibility: boolean | undefined;
  password: string ='';
  passwordConfirm: string ='';
  name: string | undefined;
  admin: boolean = false;
  user: boolean = false;

  pocketData: any;

ngOnInit(){
  console.log(this.database.pocketBase.authStore);
}
  

  signUp(){
    this.pocketData = {
      username: this.username,
      email: this.email,
      emailVisibility: true,
      password: this.password,
      passwordConfirm: this.passwordConfirm,
      name: this.name
    }

    console.log(this.pocketData);

  this.database.adminAuth((this.email).toLowerCase(),this.password).then(()=>{
    this.snackbar.open("Welcome Admin!", "Go Away!")
    // login admin here instead
  }).catch(()=>{
    this.database.userAuth((this.email).toLowerCase(),this.password).then(()=>{
      this.snackbar.open("Welcome User!", "Go Away!")
      //login user here instead
    }).catch(()=>{
      this.database.userSignIn(this.pocketData).then(() =>{
        this.snackbar.open("Welcome User!, Hi, how are ya! XD", "Go Away!")
      })
      .catch(()=>{
        this.snackbar.open("Error!, something must have went Wrong ಠ_ಠ :( (ps: Don't Bother Dev!)", 'Go Away!')
      });
    })
  })
  }
}
