import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html'
})
export class PaymentPage {

  public payForm: FormGroup;
  private id : string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public fb: FormBuilder) {

    this.payForm = fb.group({
      'cardNumber': ['', Validators.required],
      'date': ['', Validators.required],
      'cvv': ['', Validators.required],
      'submit' : [false, Validators.required]
    });

    this.id = this.navParams.get("id");
    console.log(this.id);
  }

  ionViewDidLoad() {

    if(this.id == null) {
      this.navCtrl.pop();
    }
    console.log('ionViewDidLoad PaymentPage', this.id);
  }

  formSubmit() {
    console.log(1);
    console.log(this.payForm.value);
  }
}
