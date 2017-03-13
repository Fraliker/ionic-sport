import {Component, ViewChild, ElementRef} from '@angular/core';
import {NavController, NavParams, LoadingController} from 'ionic-angular';
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
  places: Place[] = [];
  counter: number = 1;
  time: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public sportCenters: SportCenterService,
              private loadingCtrl: LoadingController) {
  }

  /**
   * loads map on view shown
   */
  ionViewDidLoad() {

    let loading = this.loadingCtrl.create({
      content: "Пожалуйста, подождите..."
    });
    loading.present();

    this.time = this.navParams.get('date');
    let date = new Date(this.navParams.get('date'));

    this.sportCenters.getSportCenters(date).subscribe((res) => {
      this.places = res;
      loading.dismissAll();
    }, (err) => {
      loading.dismissAll();
    });
  }

  /**
   * check tab on type
   * @return {boolean}
   */
  isList(): boolean {
    return this.segment === 'list';
  }

  goBack(): void {
    this.navCtrl.pop();
  }

  goToDashboard(): void {
    this.navCtrl.push(DashboardPage);
  }

  goToPlace(place: Place): void {
    this.navCtrl.push(PlacePage, {place: place, time: this.time});
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
