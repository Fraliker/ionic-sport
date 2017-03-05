import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {PlaceChoosePage} from "../place-choose/place-choose";
import {DashboardPage} from "../dashboard/dashboard";
import {SportCenterService} from "../../providers/sport-center.service";
import {Place} from "../../models/place.model";
import * as moment from 'moment';

@Component({
  selector: 'page-time-select',
  templateUrl: 'time-select.html'
})
export class TimeSelectPage {

  day: string = moment(moment().format(), moment.ISO_8601).format(); // timezone bug fixed
  minDate: string = new Date().toISOString();
  maxDate: string;
  dayShortNames: string = 'Пн, Вт, Ср, Чт, Пт, Сб, Вс';
  monthNames: string = 'январь, февраль, март, апрель, май, июнь, июль, август, сентябрь, октябрь, ноябрь, декабрь';

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {


    /**
     * setting max date
     * @type {Date}
     */
    let today = new Date();
    if (today.getMonth() == 11) {
      this.maxDate = new Date(today.getFullYear() + 1, 0, 1).toISOString();
    } else {
      this.maxDate = new Date(today.getFullYear(), today.getMonth() + 1, today.getDay()).toISOString();
    }
  }

  ionViewDidLoad() {}

  goToDashboard() {
    this.navCtrl.push(DashboardPage);
  }

  goToPlaceChoose() {
    // this.navCtrl.push(PlaceChoosePage, {date : this.day});
    this.navCtrl.push(PlaceChoosePage); //, {date : this.day});
  }
}
