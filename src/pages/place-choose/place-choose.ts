import {Component, ViewChild, ElementRef} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Place} from "../../models/place.model";
import {DashboardPage} from "../dashboard/dashboard";
import {PlacePage} from "../place/place";
import {SportCenterService} from "../../providers/sport-center.service";

@Component({
  selector: 'page-place-choose',
  templateUrl: 'place-choose.html'
})
export class PlaceChoosePage {

  @ViewChild('map') mapElement: ElementRef;
  segment: string = "list";
  map: any;
  places: Place[] = [new Place({})];
  counter: number = 1;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public sportCenters: SportCenterService) {
  }
  /**
   * loads map on view shown
   */
  ionViewDidLoad() {

    let date = new Date(this.navParams.get('date'));

    this.sportCenters.getSportCenters(date).subscribe((res) => {
      this.places = res;
    });
  }

  /**
   * check tab on type
   * @return {boolean}
   */
  isList(): boolean {
    return this.segment === 'list';
  }


  goToDashboard() {
    this.navCtrl.push(DashboardPage);
  }

  goToPlace(place: Place) {
    this.navCtrl.push(PlacePage, {place: place});
  }

  /**
   * adding new place to map, updates Array reference
   */
  addNewPlace() {
    let newPlaces = Array.from(this.places);
    newPlaces.push(new Place({name: 'letMeSport test', latitude: 55 + this.counter, longitude: 32 + this.counter}));
    this.places = newPlaces;
  }

  // addNewPlace(place : Place) {
  //   let newPlaces = Array.from(this.places);
  //   newPlaces.push(new Place({name: 'letMeSport test' , latitude: 55+ this.counter, longitude: 32+ this.counter}));
  //   this.places = newPlaces;
  //   console.log(this.places);
  // }
}
