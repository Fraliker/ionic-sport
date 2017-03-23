import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Place} from "../../models/place.model";
import {SportCenterService} from "../../providers/sport-center.service";

declare const ymaps;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  place: Place;
  point: GeoPoint = {
    lat: 0,
    lng: 0
  };
  pointB: GeoPoint;
  map;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public sportCenter: SportCenterService) {
    console.log(this.navParams.data);
  }

  /**
   * check logic type: draw single place or route
   */
  ionViewDidLoad() {
    this.place = this.navParams.get('place') ? this.navParams.get('place') : null;
    this.pointB = this.navParams.get('pointB');

    if (this.place != null) {
      console.debug('Map scenarios: Place');
      this.point.lat = this.place.latitude;
      this.point.lng = this.place.longitude;

      ymaps.ready(this.drawPlace(this.point));

    } else if (this.pointB != null) {
      console.debug('Map scenarios: Route');
      ymaps.ready(this.drawRoute());
    }
  }

  /**
   * draws single placemark on map
   */
  drawPlace(point: GeoPoint): void {
    this.map = new ymaps.Map('map1', {
      center: [point.lat, point.lng], // Москва
      zoom: 12
    }, {
      searchControlProvider: 'yandex#search'
    });
    this.map.geoObjects.add(this.createPlacemark(point));
  }

  /**
   * sets route to map from start point(user location) to end point
   */
  drawRoute(): void {

    console.debug('darw route');
    this.map = new ymaps.Map('map1', {
      center: [55.734876, 37.59308], // Москва will be owerride by map route generator
      zoom: 5
    }, {
      searchControlProvider: 'yandex#search'
    });

    let multiRoute = new ymaps.multiRouter.MultiRoute({
      // Описание опорных точек мультимаршрута.
      referencePoints: [
        [this.sportCenter.position.lat, this.sportCenter.position.lng],
        [this.pointB.lat, this.pointB.lng]
      ],
      params: {
        results: 3
      }
    }, {
      boundsAutoApply: true
    });
    this.map.geoObjects.add(multiRoute);
  }

  /**
   * generate placemark
   * @param place
   * @return {ymaps.Placemark}
   */
  createPlacemark(point: GeoPoint): any {
    return new ymaps.Placemark([point.lat, point.lng], {}, {
      preset: 'islands#icon',
      iconLayout: 'default#image',
      iconImageHref: 'assets/images/map-marker.png',
      iconImageSize: [80, 80],
      iconImageOffset: [-40, -40]
    });
  }
}

interface GeoPoint {
  lat: number;
  lng: number;
}
