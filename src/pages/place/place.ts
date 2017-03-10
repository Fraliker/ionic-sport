import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
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

@Component({
  selector: 'page-place',
  templateUrl: 'place.html',
  providers: [QuestionControlService]
})

export class PlacePage implements OnInit {

  place: Place;
  form: FormGroup;
  corts: QuestionBase<any>[] = [new InputQuestion({
    key: 'playground',
    label: 'Площадка',
    type: 'checkbox',
    order: 4,
    required: true
  })];

  customOptions: QuestionBase<any>[] = [

    new InputQuestion({
      key: 'playground',
      label: 'Площадка',
      type: 'checkbox',
      order: 4,
      required: true
    })

  ];

  questions: QuestionBase<any>[] = [

    // new DropdownQuestion({
    //   key: 'brave',
    //   label: 'Bravery Rating',
    //   options: [
    //     {key: 'solid', value: 'Solid'},
    //     {key: 'great', value: 'Great'},
    //     {key: 'good', value: 'Good'},
    //     {key: 'unproven', value: 'Unproven'}
    //   ],
    //   order: 3
    // }),
    //
    // new TextboxQuestion({
    //   key: 'firstName',
    //   label: 'First name',
    //   value: 'Bombasto',
    //   required: true,
    //   order: 1
    // }),
    //
    // new TextboxQuestion({
    //   key: 'emailAddress',
    //   label: 'Email',
    //   type: 'email',
    //   order: 2
    // }),

    // new InputQuestion({
    //   key: 'playground',
    //   label: 'Площадка',
    //   type: 'checkbox',
    //   order: 4,
    //   required: true
    // }),
    //
    // new RadioQuestion({
    //   key: 'playground',
    //   label: 'Площадка',
    //   order: 5,
    //   group: '1',
    //   options: [
    //     {key: 'solid', value: 'Solid'},
    //     {key: 'great', value: 'Great'},
    //     {key: 'good', value: 'Good'},
    //     {key: 'unproven', value: 'Unproven'}
    //   ]
    // })
  ];
  time: string;
  dayShortNames: string = names.dayShortNames;
  monthNames: string = names.monthNames;

  constructor(public navCtrl: NavController, public navParams: NavParams, public qct: QuestionControlService) {
    this.place = this.navParams.get("place");
    this.time = new Date(this.navParams.get("time")).toISOString();
    // this.form.addControl('mycontrol', new FormControl('', Validators.required()));
  }

  ngOnInit(): void {
    this.form = this.qct.toFormGroup(this.questions);
    // this.customOptions.concat();
  }

  ionViewDidLoad() {

  }

  goToDashboard() {
    this.navCtrl.push(DashboardPage);
  }
}
