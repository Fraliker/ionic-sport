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

  place: Place;
  order: Order;

  //TODO add logic
  addCommentShow: boolean = false;
  comment: string = '';
  phone: string = '+7(007)849-32-24';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.place = this.navParams.get('place');
    console.log(this.place);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderSubmitPage');
  }

  submitOrder() {
    console.log(this.comment);
  }
}
