import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {SmsService} from './sms-code.service';
/*
 Check sms code
 */
@Component({
  templateUrl: 'sms-verify.page.html',
  selector: 'sms-code',
  providers: [SmsService]
})
export class SmsVerifyPage {

  name: string;
  phone: string;

  constructor(private navCtrl: NavController, private navParams: NavParams, private codeService: SmsService) {
    this.name = navParams.get('name');
    this.phone = navParams.get('phone');
  }

  goBackToAuth() {
    this.navCtrl.pop();
  }

  verifyCode(value: HTMLInputElement) {

    console.log(value);
    // this.codeService.checkSMSCode((res) => {
    //
    // });
  }
}
