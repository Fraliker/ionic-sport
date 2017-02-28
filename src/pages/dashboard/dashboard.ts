import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {BookInfoPage} from '../pages';
import {User} from "../../app/models/user.model";
import {AuthService} from "../../app/services/auth.service";
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

  private booked; //= ['Jane', 'Stan', 'Genry', 'Margaret'];
  place: string = 'Корт с грунтовым покрытием';
  date: string = '19 января 2017 в 18:00';
  price: number = 9900;
  user: User = new User({});

  ngOnInit(): void {

  }

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public auth: AuthService) {

    this.auth.isAuthentificated().then((res: User) => {
      this.user = res;
    });
  }

  ionViewDidLoad() {
  }

  goToBookInfo(book) {
    this.navCtrl.push(BookInfoPage, {'book': book});
  }

  goToDashboard() {

  }
}
