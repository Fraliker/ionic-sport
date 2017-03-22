import {Component} from '@angular/core';
import {AlertController, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
import {Booking} from "../../models/Booking";
import {DashboardService} from "../dashboard/dashboard.service";
import {PaymentPage} from "../payment/payment";
import {TimeSelectPage} from "../time-select/time-select";
import {MapPage} from "../map/map";

@Component({
  selector: 'page-book-info',
  templateUrl: 'book-info.html'
})
export class BookInfoPage {

  book: Booking = null;
  id: string;
  loader: Loading;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public dashBoardService: DashboardService,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController) {
  }

  ionViewWillEnter() {
  }

  ionViewDidLoad() {
    this.id = this.navParams.get('id');

    this.dashBoardService.getBooking(this.id).subscribe(((res: Booking) => {
      this.book = res;
      console.log(this.book);
    }));
  }

  goToPayment() {
    this.navCtrl.push(PaymentPage, {id: this.book.id});
  }

  goToMainPage() {
    this.navCtrl.setRoot(TimeSelectPage);
  }

  goToMapRout() {
    this.presentLoading();

    this.dashBoardService.getBookingRoute(this.book.playingFieldID).subscribe((res) => {
      this.dismissLoading();
      this.navCtrl.push(MapPage, {'pointB': {lat: res.latitude, lng: res.longitude}});
    }, (err) => {
      this.dismissLoading();
      this.showAlert();
    });
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Ошибка',
      subTitle: 'Спортивный центр не найден',
      buttons: ['OK']
    });
    alert.present();
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Пожалуйста, подождите..."
    });
    this.loader.present();
  }

  dismissLoading() {
    this.loader.dismissAll();
  }
}
