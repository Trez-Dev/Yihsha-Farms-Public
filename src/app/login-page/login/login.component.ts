import { Component } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PocketbaseService } from 'src/app/pocketbase.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide: boolean = true;

  usernameOrEmail: string = '';
  password: string = '';

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(private database: PocketbaseService, 
    private snackbar: MatSnackBar,
     private router: Router,
     private activatedRoute: ActivatedRoute){}

  matcher = new MyErrorStateMatcher();


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
    // this.database.loginWithGoogle();
    // const userData: Observable<Params> = this.activatedRoute.params;
    // console.log(userData);

    
  const handleRedirect = async () => {
    const params = new URL(window.location as unknown as string | URL).searchParams;
    const provider = localStorage.getItem('provider');

    if(params.get('code') && provider){
      await this.database.confirmGoogleLogin;
    }
  }
  }
}
