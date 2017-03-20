import {Component} from '@angular/core';
import {NavController, NavParams, AlertController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PaymentService} from "../../providers/payment.service";

@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html'
})
export class PaymentPage {

  public payForm: FormGroup;
  private id: string;
  maskCardNumber = [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/];
  maskDate = [/[0-1]/, /[0-9]/, '/', /[1-5]/, /[0-9]/];
  maskCVV = [/\d/, /\d/, /\d/];
  mask = ['+', '7', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public fb: FormBuilder,
              public payService: PaymentService,
              public alertCtrl: AlertController) {

    this.payForm = fb.group({
      'cardNumber': ['', [Validators.required, Validators.minLength(19)]],
      'date': ['', [Validators.required, Validators.pattern(/(1[0-2]|0[1-9]|\d)\/(\d{2}|0(?!0)\d|[1-9]\d)/)]],
      'cvv': ['', [Validators.required, Validators.pattern(/\d{3}/)]],
      'submit': [false, Validators.required]
    });

    this.id = this.navParams.get("id");
  }

  ionViewDidLoad() {

    if (this.id == null) {
      this.navCtrl.pop();
    }
    console.log('ionViewDidLoad PaymentPage', this.id);
  }

  formSubmit() {
    this.payService.sendPayment(this.id).subscribe((res) => {

      this.showAlert("Спасибо", "Ваш платеж принят");
    }, (err) => {

      this.showAlert();
    });
  }

  public showAlert(title: string = 'Упс', text: string = 'Не удалось оплатить'): void {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }
}
