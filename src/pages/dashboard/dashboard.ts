import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, LoadingController, Loading} from 'ionic-angular';
import {BookInfoPage} from '../pages';
import {User} from "../../app/models/user.model";
import {AuthService} from "../../app/services/auth.service";
import {DashboardService} from "./dashboard.service";
import 'rxjs';
import {Booking} from "../../app/models/Booking";
/*
 Generated class for the Dashboard page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage implements OnInit {

  price: number = 9900;
  user: User = new User({});
  booked: Booking[] = [];// [new Booking({
    // id: 10,
    // priceTime: 1200,
    // day: 11, hour: 11,
    // mounth: 3,
    // playingField: 'Северная площадка',
    // pricePlayingField: 300
  // })];
  loading: Loading;

  ngOnInit(): void {

    this.loading = this.loadingCtrl.create({
      content: "Идет загрузка..."
    });

    this.dashBoardService.getOwnBookings().subscribe((res) => {
      this.booked = res;
      this.loading.dismissAll();
    }, (err) => {
      this.loading.dismissAll();
    });
  }

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public auth: AuthService,
              public dashBoardService: DashboardService,
              public loadingCtrl: LoadingController) {

    this.user = AuthService.getCurrentUser();
  }

  ionViewDidLoad() {
    // this.loading.present();
  }

  goToBookInfo(book) {
    this.navCtrl.push(BookInfoPage, {'book': book});
  }

  goToDashboard() {

  }
}
