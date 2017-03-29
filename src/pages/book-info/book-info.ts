import {Component, ElementRef, ViewChild} from '@angular/core';
import {AlertController, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
import {Booking} from "../../models/Booking";
import {DashboardService} from "../dashboard/dashboard.service";
import {PaymentPage} from "../payment/payment";
import {TimeSelectPage} from "../time-select/time-select";
import {MapPage} from "../map/map";
import {SocialShare} from "../../components/SocialShare/SocicalShare";

@Component({
  selector: 'page-book-info',
  templateUrl: 'book-info.html'
})
export class BookInfoPage {

  @ViewChild('contentnode') contentNode: ElementRef;
  book: Booking = null;
  id: string;
  loader: Loading;
  socialShare: SocialShare;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public dashBoardService: DashboardService,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController) {
    this.socialShare = new SocialShare();
  }

  ionViewDidLoad() {
    this.id = this.navParams.get('id');

    this.dashBoardService.getBooking(this.id).subscribe(((res: Booking) => {
      this.book = res;
      // console.log(this.book);
    }), (err) => {
      // if error go back to list
      this.navCtrl.pop();
    });
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

  showAlert(): void {
    let alert = this.alertCtrl.create({
      title: 'Ошибка',
      subTitle: 'Спортивный центр не найден',
      buttons: ['OK']
    });
    alert.present();
  }

  presentLoading(): void {
    this.loader = this.loadingCtrl.create({
      content: "Пожалуйста, подождите..."
    });
    this.loader.present();
  }

  dismissLoading(): void {
    this.loader.dismissAll();
  }

  sendMail(): void {
    this.loader = this.loadingCtrl.create({
      content: "Пожалуйста, подождите..."
    });
    this.loader.present();


    // this.socialShare.sendMailBooking(this.id, this.book, this.contentNode);
    this.socialShare.sendMailBooking(this.id, this.book, this.contentNode).then(() => {
      this.dismissLoading();
    }).catch(() => {
      this.dismissLoading();

      let alert = this.alertCtrl.create({
        title: 'Ошибка',
        subTitle: 'Спортивный центр не найден',
        buttons: ['OK']
      });
      alert.present();
    });
  }

  shareToFriend(): void {
    this.socialShare.shareToFriend(this.book.date);
  }

  sendSuppotMail(): void {
    this.socialShare.sendSuppotMail();
  }
}
