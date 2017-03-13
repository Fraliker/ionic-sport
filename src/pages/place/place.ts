import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, RadioGroup, LoadingController, ToastController} from 'ionic-angular';
import {Place} from "../../models/place.model";
import {DashboardPage} from "../dashboard/dashboard";
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {QuestionBase} from './dynamic-form/question-base';
import {DropdownQuestion} from "./dynamic-form/question-dropdown";
import {TextboxQuestion} from "./dynamic-form/question-textbox";
import {QuestionControlService} from './dynamic-form/question-control.service';
import '../../config/russian-time';
import {names} from "../../config/russian-time";
import {InputQuestion} from "./dynamic-form/question-input";
import {RadioQuestion} from "./dynamic-form/question-radio";
import {Response} from "@angular/http";
import {PlaceService} from "../../models/place-service";
import {OrderSubmitPage} from "../order-submit/order-submit";
import {SportCenterService} from "../../providers/sport-center.service";
import {Order} from "../../models/order.model";
import {AuthService} from "../../providers/auth.service";

@Component({
  selector: 'page-place',
  templateUrl: 'place.html',
  providers: [QuestionControlService]
})

export class PlacePage implements OnInit {

  place: Place;
  form: FormGroup;
  corts: QuestionBase<any>[] = [new InputQuestion({})];
  customOptions: QuestionBase<any>[] = [];
  questions: QuestionBase<any>[] = [];
  time: string;
  dayShortNames: string = names.dayShortNames;
  monthNames: string = names.monthNames;
  minDate: string = new Date().toISOString();
  maxDate: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public sportCenters: SportCenterService,
              private loadingCtrl: LoadingController,
              public qct: QuestionControlService,
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
    this.time = new Date(this.navParams.get("time")).toISOString();
    this.questions = this.parseRadio(this.place.playingFields);
    this.form = this.qct.toFormGroup(this.questions);

    this.sportCenters.checkSportCenter(new Date(this.time), this.place)
      .subscribe((res) => {
        console.log(res);
        loading.dismissAll();

        this.place = res;
        this.questions = this.parseRadio(this.place.playingFields);
        this.form = this.qct.toFormGroup(this.questions);
        this.time = new Date(this.navParams.get("time")).toISOString();
      }, (err) => {
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

  parseRadio(playingFields): RadioQuestion[] {

    let radioGroup = [];

    playingFields.forEach((item) => {

      let obj = {};
      obj['required'] = true;
      obj['key'] = item.id;
      obj['label'] = item.name + " " + item.price;
      obj['value'] = item.name;
      obj['name'] = item.id;

      radioGroup.push(new RadioQuestion(obj));
    });

    return radioGroup;
  }

  parseCheckbox(services: PlaceService[]): InputQuestion[] {
    let checkboxes = [];

    services.forEach((item) => {

      let obj = {};
      obj['key'] = item.id;
      obj['label'] = item.name + " " + item.price;
      obj['value'] = item.name;
      obj['name'] = item.id;
      obj['type'] = "checkbox";

      checkboxes.push(new InputQuestion(obj));
    });

    return checkboxes;
  }

  formSubmit(form) {

    this.sportCenters.checkSportCenter(new Date(this.time), this.place)
      .subscribe((res) => {

        //TODO price add
        let obj = {
          place: this.place,
          time: new Date(this.time),
          price: 1150,
          user: AuthService.getCurrentUser(),
          orderList: ['Верхняя площадка', 'Чиcтые носки']
        };

        let order = new Order(obj);
        console.log('Order: ', order);

        this.navCtrl.push(OrderSubmitPage, {order: order});

      }, (err) => {

        let toast = this.toastCtrl.create({
          message: 'Проверьте дату, не получилось проверить дату',
          duration: 2000
        });
        toast.present();
      });

  }
}
