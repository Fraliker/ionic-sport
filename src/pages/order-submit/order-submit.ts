import {Component, trigger, transition, style, animate} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

import {Place} from "../../models/place.model";
import {Order} from "../../models/order.model";


@Component({
  selector: 'page-order-submit',
  templateUrl: 'order-submit.html',
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({height: 0, opacity: 0}),
          animate('300ms', style({height: 150, opacity: 1}))
        ]),
        transition(':leave', [
          style({height: 150, opacity: 1}),
          animate('300ms', style({height: 0, opacity: 0}))
        ])
      ]
    )
  ]
})

export class OrderSubmitPage {

  order: Order;
  addCommentShow: boolean = false;
  time: Date = new Date();

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.order = this.navParams.get('order');
    this.time = new Date(this.order.time);

    console.log(this.order);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderSubmitPage');
  }

  submitOrder() {
    console.log(this.order);
    // this.navCtrl.push(PaymentPage);
  }
}
