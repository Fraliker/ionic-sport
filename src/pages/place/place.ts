import {Component, OnInit} from '@angular/core';
import {NavController, NavParams,  LoadingController, ToastController} from 'ionic-angular';
import {Place} from "../../models/place.model";
import {DashboardPage} from "../dashboard/dashboard";
import {FormGroup} from '@angular/forms';
import '../../config/russian-time';
import {names} from "../../config/russian-time";
import {OrderSubmitPage} from "../order-submit/order-submit";
import {SportCenterService} from "../../providers/sport-center.service";
import {Order} from "../../models/order.model";
import {AuthService} from "../../providers/auth.service";

@Component({
  selector: 'page-place',
  templateUrl: 'place.html',
})

export class PlacePage implements OnInit {
  place: Place;
  form: FormGroup;
  time: string;
  dayShortNames: string = names.dayShortNames;
  monthNames: string = names.monthNames;
  minDate: string = new Date().toISOString();
  maxDate: string;
  oldTime: string;
  oldData: {place: Place, time: string};

  fromData = {};
  public user = {};

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public sportCenters: SportCenterService,
              private loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              public auth: AuthService) {

    let today = new Date();
    if (today.getMonth() == 11) {
      this.maxDate = new Date(today.getFullYear() + 1, 1, 1).toISOString();
    } else {
      this.maxDate = new Date(today.getFullYear(), today.getMonth() + 2, today.getDay() - 1).toISOString();
    }
  }

  ngOnInit(): void {

    let loading = this.loadingCtrl.create({
      content: "Пожалуйста, подождите..."
    });
    loading.present();

    this.place = this.navParams.get("place");
    this.time = this.navParams.get("time");
    this.oldTime = this.navParams.get("time");

    /**
     * updating sport center information
     */
    this.sportCenters.checkSportCenter(new Date(this.time), this.place)
      .subscribe((res) => {
        loading.dismissAll();

        this.place = res;
        this.time = this.navParams.get("time");

        // setting defaults to form radio button
        this.user['playground'] = this.place.playingFields[0].name;

      }, () => {
        loading.dismissAll();
        let toast = this.toastCtrl.create({
          message: 'Ошибка загрузки',
          duration: 2000
        });
        toast.present();
        this.navCtrl.pop();
      });
  }

  ionViewDidLoad() {

  }

  goToDashboard() {
    this.navCtrl.push(DashboardPage);
  }

  /**
   * check time avaliability for this sport center
   */
  dateChange() {
    this.sportCenters.checkSportCenter(new Date(this.time), this.place)
      .subscribe((res) => {
        console.log(res);
        this.place = res;


      }, (err) => {
        console.log(err);
        this.oldData = {place: this.place, time: this.time};
        this.place = null;
      });

  }

  /**
   * after data change return data
   */
  returnResults() {
    this.place = this.oldData.place;
    this.time = this.oldTime;
  }

  /**
   * form submit, parse
   * @param form
   */
  formSubmit(form) {

    this.sportCenters.checkSportCenter(new Date(this.time), this.place)
      .subscribe(() => {
        let obj = {
          place: this.place,
          time: this.time,
          orderList: this.servicesFromForm(form),
          price: this.calcPrice(form),
          user: AuthService.getCurrentUser(),
          playground: form.playground
        };

        let order = new Order(obj);

        this.navCtrl.push(OrderSubmitPage, {order: order});
      }, (err) => {

        let toast = this.toastCtrl.create({
          message: 'Проверьте дату, не получилось проверить дату',
          duration: 2000
        });
        toast.present();
      });
  }

  /**
   * grabs all values from the form
   * @return {number}
   */
  private calcPrice(obj): number {
    let price: number = 0;

    for (let prop in obj) {
      if (prop == 'playground') {
        this.place.playingFields.forEach((item) => {
          if (item.name == obj[prop]) {
            price += +item.price;
          }
        });
      }
      if (prop != 'playground') {
        if (obj[prop] != null && obj[prop] == true) {
          this.place.services.forEach((item)=>{
            if (item.name == prop) {
              price += +item.price;
            }
          });
        }
      }
    }

    return price;
  }

  /**
   * grabs all values from obj
   * @return {string[]}
   */
  private servicesFromForm(obj): string[] {

    let arr = [];

    for (let prop in obj) {
      if (prop != 'playground') {
        if (obj[prop] != null && obj[prop] == true) {
          arr.push(prop);
        }
      }
    }
    return arr;
  }


}
