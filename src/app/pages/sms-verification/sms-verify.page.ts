import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {DashboardPage} from '../pages';
import {AuthService} from '../../services/auth.service';

/*
 Check sms code
 */
const codeLength: number = 5;

@Component({
  templateUrl: 'sms-verify.page.html',
  selector: 'sms-code',
})
export class SmsVerifyPage {

  name: string;
  phone: string;
  inputMaxLength: number = codeLength;
  inputCode;

  constructor(private navCtrl: NavController, private navParams: NavParams, private auth: AuthService) {
    this.name = navParams.get('name');
    this.phone = navParams.get('phone');
  }

  goBackToAuth() {
    this.navCtrl.pop();
  }

  verifyCode() {

    if (this.inputCode.length === this.inputMaxLength) {
      this.navCtrl.setRoot(DashboardPage);
    }
  }
}
