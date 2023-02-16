import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  userOptions = [
    {
      name: "Your Orders",
      description: "Track, return or buy",
      icon: "../../../assets/images/Onion-PNG.png"
    },
    {
      name: "Address",
      description: "Belle AireMeadows, Brown's Town P.O, St. Ann",
      icon: "../../../assets/images/Pepper.png"
    },
    {
      name: "Previous Orders",
      description: "View and Manage",
      icon: "../../../assets/images/all-spice-Pimento-whole.png"
    },
    {
      name: "Payment Methods",
      description: "View and Manage",
      icon: "../../../assets/images/all-spice-Pimento-whole.png"
    },
  ]
}
