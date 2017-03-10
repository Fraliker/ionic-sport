import {Component, trigger, transition, style, animate} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the OrderSubmit page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
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

  addCommentShow : boolean = false;
  comment : string = '';
  phone: string = '+7(007)849-32-24';

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderSubmitPage');
  }

  submitOrder() {
    console.log(this.comment);
  }
}
