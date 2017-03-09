import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Place} from "../../models/place.model";
import {DashboardPage} from "../dashboard/dashboard";
import {FormGroup, FormControl} from '@angular/forms';
import {QuestionBase} from './dynamic-form/question-base';
import {DropdownQuestion} from "./dynamic-form/question-dropdown";
import {TextboxQuestion} from "./dynamic-form/question-textbox";
import {QuestionControlService} from './dynamic-form/question-control.service';
import '../../config/russian-time';
import {names} from "../../config/russian-time";
import {InputQuestion} from "./dynamic-form/question-input";
import {RadioQuestion} from "./dynamic-form/question-radio";

@Component({
  selector: 'page-place',
  templateUrl: 'place.html',
  providers: [QuestionControlService]
})

export class PlacePage implements OnInit {

  place: Place;
  form: FormGroup;
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
    //   order: 4
    // }),

    new RadioQuestion({
      key: 'playground',
      label: 'Площадка',
      order: 5,
      group: '1',
      options: [
        {key: 'solid', value: 'Solid'},
        {key: 'great', value: 'Great'},
        {key: 'good', value: 'Good'},
        {key: 'unproven', value: 'Unproven'}
      ]
    })
  ];
  time: string;
  dayShortNames: string = names.dayShortNames;
  monthNames: string = names.monthNames;

  constructor(public navCtrl: NavController, public navParams: NavParams, public qct: QuestionControlService) {
    this.place = this.navParams.get("place");
    this.time = new Date(this.navParams.get("time")).toISOString();

    console.log(this.questions);
  }

  ngOnInit(): void {
    this.form = this.qct.toFormGroup(this.questions);
  }

  ionViewDidLoad() {

  }

  pushToDynamicForm() {
    this.questions.push(
      new RadioQuestion({
        key: 'playground',
        label: 'Площадка 2',
        order: 5,
        group: '2',
        options: [
          {key: 'gery', value: 'Grey'},
          {key: 'great2', value: 'Great2'},
          {key: 'good2', value: 'Good2'},
          {key: 'unproven2', value: 'Unproven2'}
        ]
      })
    );
  }

  goToDashboard() {
    this.navCtrl.push(DashboardPage);
  }
}
