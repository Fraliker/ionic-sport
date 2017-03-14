import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Booking} from "../../models/Booking";
import {DashboardService} from "../dashboard/dashboard.service";

@Component({
  selector: 'page-book-info',
  templateUrl: 'book-info.html'
})
export class BookInfoPage {

  book: Booking = null;
  id: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public dashBoardService: DashboardService) {
  }

  ionViewWillEnter() {
  }

  ionViewDidLoad() {
    this.id = this.navParams.get('id');

    this.dashBoardService.getBooking(this.id).subscribe(((res: Booking) => {
      this.book = res;
    }));
  }
}
