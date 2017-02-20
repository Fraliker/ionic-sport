import {Component, ElementRef} from '@angular/core';
import {AuthService} from './authentication.service';

import {NavController, ToastController} from 'ionic-angular';

@Component({
  selector: 'page-authentication',
  templateUrl: 'authentication.html',
})
export class AuthenticationPage {
  name: string;
  phone: string;

  constructor(public navCtrl: NavController, el: ElementRef, public auth: AuthService) {
  }

  login() {

    this.auth.login(this.name, this.phone)
      .subscribe((data) => {

    }, (err) => {
      
    });
  }
}
