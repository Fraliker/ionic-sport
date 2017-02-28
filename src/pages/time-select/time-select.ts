import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {MainSportChoosePage} from "../main-sport-choose/main-sport-choose";
import {PlaceChoosePage} from "../place-choose/place-choose";
import * as moment  from 'moment';
import {DashboardPage} from "../dashboard/dashboard";

@Component({
  selector: 'page-time-select',
  templateUrl: 'time-select.html'
})
export class TimeSelectPage {

  day : string = new Date().toISOString();
  time : string = new Date().toISOString();

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

  goToDashboard() {
    this.navCtrl.push(DashboardPage);
  }

  goToPlaceChoose() {
    this.navCtrl.push(PlaceChoosePage);
  }
}
