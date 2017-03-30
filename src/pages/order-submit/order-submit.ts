import {Component, trigger, transition, style, animate} from '@angular/core';
import {NavController, NavParams, LoadingController, ToastController} from 'ionic-angular';
import {Order} from "../../models/order.model";
import {PaymentPage} from "../payment/payment";
import {SportCenterService} from "../../providers/sport-center.service";

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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public sportCenterService: SportCenterService,
              private loadingCtrl: LoadingController,
              public toastCtrl: ToastController) {
    this.order = this.navParams.get('order');
    this.time = new Date(this.order.time);

    console.log(this.order);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderSubmitPage');
  }

  submitOrder() {

    let loading = this.loadingCtrl.create({
      content: "Пожалуйста, подождите..."
    });
    loading.present();

    this.sportCenterService.placeOrder(this.order).subscribe((res) => {
      let toast = this.toastCtrl.create({
        message: 'Бронирование размещено, оплатите за 30 минут',
        position: 'center',
        duration: 4000,
        showCloseButton: true,
        closeButtonText: "закрыть"
      });

      let id = res;

      loading.dismissAll();
      this.navCtrl.push(PaymentPage, {id : id});

    }, (err) => {

      loading.dismissAll();

      let toast = this.toastCtrl.create({
        message: 'Не удалось разместить заказ, обратитесь к администратору',
        position: 'center',
        duration: 4000,
        showCloseButton: true,
        closeButtonText: "закрыть"
      });
      toast.present();
    });
  }
}
