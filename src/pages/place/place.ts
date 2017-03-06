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
  time: string;
  dayShortNames: string = 'Пн, Вт, Ср, Чт, Пт, Сб, Вс';
  monthNames: string = 'январь, февраль, март, апрель, май, июнь, июль, август, сентябрь, октябрь, ноябрь, декабрь';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.place = this.navParams.get("place");
    this.time= new Date(this.navParams.get("time")).toISOString();
  }

  ionViewDidLoad() {
  }

  goToDashboard() {
    this.navCtrl.push(DashboardPage);
  }
}
