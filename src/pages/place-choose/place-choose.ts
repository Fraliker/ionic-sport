import {Component, ViewChild, ElementRef} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import { Geolocation } from 'ionic-native';
import {Place} from "../../app/models/place.model";

@Component({
  selector: 'page-place-choose',
  templateUrl: 'place-choose.html'
})
export class PlaceChoosePage {

  @ViewChild('map') mapElement: ElementRef;
  segment: string = "list";
  map: any;
  places: Place[] = [];
  counter: number = 1;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.places.push(new Place({}));
  }

  /**
   * loads map on view shown
   */
  ionViewDidLoad() {
  }

  /**
   * check tab on type
   * @return {boolean}
   */
  isList() : boolean {
    return this.segment === 'list';
  }

  /**
   * adding new place to map, updates Array reference
   */
  addNewPlace() {
    let newPlaces = Array.from(this.places);
    newPlaces.push(new Place({latitude: 55+ this.counter, longitude: 32+ this.counter}));
    this.places = newPlaces;
  }
}
