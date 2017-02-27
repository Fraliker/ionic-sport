import {Component} from '@angular/core';
import {NavController, NavParams, LoadingController} from 'ionic-angular';
import {DashboardPage, MainSportChoosePage} from '../pages';
import {AuthService} from '../../app/services/auth.service';
import {User} from "../../app/models/user.model";

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
  testCode: string;
  inputCode;
  validCode: boolean = true;

  constructor(private navCtrl: NavController, private navParams: NavParams, private auth: AuthService,
              private loadingCtrl: LoadingController) {
    this.name = navParams.get('name');
    this.phone = navParams.get('phone');
    this.testCode = navParams.get('code');
  }

  goBackToAuth() {
    this.navCtrl.pop();
  }

  verifyCode() {
    if (this.inputCode.length === this.testCode.length && this.inputCode === this.testCode) {

      let loading = this.loadingCtrl.create({
        content: "Sending email..."
      });
      loading.present();

      this.auth.checkSMSCode(new User({code: this.inputCode, name: this.name, phone: this.phone}))
        .subscribe((res) => {

          this.navCtrl.setRoot(MainSportChoosePage);
          this.navCtrl.push(DashboardPage);

          loading.dismissAll();

        }, (err) => {
          loading.dismissAll();
        });

    } else if (this.inputCode.length === this.testCode.length && this.inputCode !== this.testCode) {
      this.validCode = false;
    }
  }

  sendNewCode() {

    let loading = this.loadingCtrl.create({content: 'Новое сообщение отправляется'});
    loading.present();

    this.auth.login(this.name, this.phone).subscribe((res) => {
      loading.dismiss();
      this.testCode = res;

    }, (err) => {
      loading.dismiss();
      console.log(err);
    });
  }
}
