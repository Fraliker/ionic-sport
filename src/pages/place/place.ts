import {Component, OnInit} from '@angular/core';
import {NavController, NavParams, RadioGroup} from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public qct: QuestionControlService) {

    this.place = this.navParams.get("place");
    this.time = new Date(this.navParams.get("time")).toISOString();

  }

  ngOnInit(): void {
    this.questions = this.parseRadio(this.place.playingFields);
    console.log("return radio", this.parseRadio(this.place.playingFields));
    console.log("return checkbox", this.parseCheckbox(this.place.services));

    this.parseCheckbox(this.place.services).forEach((item) => {
      console.log(item);
      this.questions.push(item);
    });
    this.questions.concat(this.parseCheckbox(this.place.services));


    console.log(this.questions);
    this.form = this.qct.toFormGroup(this.questions);
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
    console.log(form.value);
    console.log(form.valid);
  }
}
