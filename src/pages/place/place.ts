import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Place} from "../../models/place.model";
import {DashboardPage} from "../dashboard/dashboard";

@Component({
  selector: 'page-place',
  templateUrl: 'place.html'
})
export class PlacePage {

  place: Place;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.place = this.navParams.get("place");
    console.log(this.place);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlacePage');
  }

  goToDashboard() {
    this.navCtrl.push(DashboardPage);
  }
}
