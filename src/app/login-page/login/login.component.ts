import { Component } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PocketbaseService } from 'src/app/pocketbase.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  hide: boolean = true;

  usernameOrEmail: string = '';
  password: string = '';

  constructor(private database: PocketbaseService, 
    private snackbar: MatSnackBar,
     private router: Router,
     private activatedRoute: ActivatedRoute){}


  login(){
    this.database.adminAuth((this.usernameOrEmail).toLowerCase(),this.password).then((data) => {
      this.snackbar.open("Welcome Admin!", "Go Away!");
      this.router.navigate([`/user-page/${data}`]);
    }).catch(() => {
      this.database.userAuth((this.usernameOrEmail).toLowerCase(),this.password).then((data) => {
      this.snackbar.open("Welcome User!", "Go Away!");
      this.router.navigate([`/user-page/${data}`])
      }).catch(()=>{
        this.snackbar.open("Error!, something must have went Wrong ಠ_ಠ :( (ps: Don't Bother Dev!)", 'Go Away!')
      });
    });
  }

  googleLogin(){
    this.database.loginWithGoogle();
  }
}
