import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { PocketbaseService } from 'src/app/pocketbase.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';



export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  hide: boolean = true;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  matcher = new MyErrorStateMatcher();

  constructor(private database: PocketbaseService, 
    private snackbar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private router: Router){}

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
  // console.log(this.database.pocketBase.authStore);
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

  this.database.adminAuth((this.email).toLowerCase(),this.password).then((data)=>{
    this.snackbar.open("You Are Already a registered Admin, Plese Login!", "Go Away!");
      this.router.navigate(["/login"]);
  }).catch(()=>{
    this.database.userAuth((this.email).toLowerCase(),this.password).then(()=>{
      this.snackbar.open("You Are Already a registered User, Plese Login!", "Go Away!");
      this.router.navigate(["/login"]);
    }).catch(()=>{
      this.database.userSignIn(this.pocketData).then((data) =>{
        this.snackbar.open("Welcome User!, Hi, how are ya! XD", "Go Away!");
        this.database.userAuth((this.email).toLowerCase(),this.password).then((data) => {
          this.snackbar.open("Welcome User!", "Go Away!");
          this.router.navigate([`/user-page/${data}`])
          }).catch(()=>{
            this.snackbar.open("Error!, something must have went Wrong ಠ_ಠ :( (ps: Don't Bother Dev!)", 'Go Away!')
          });
      })
      .catch(()=>{
        this.snackbar.open("Error!, something must have went Wrong ಠ_ಠ :( (ps: Don't Bother Dev!)", 'Go Away!')
      });
    })
  })
  }

  googleLogin(){
    this.database.loginWithGoogle();
  }
}
