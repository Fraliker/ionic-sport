import {Component, ViewChild, ElementRef, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Geolocation} from 'ionic-native';
import {Place} from "../../../models/place.model";

declare var ymaps;

@Component({
  selector: 'yandex-map',
  templateUrl: 'map.template.html'
})
export class YandexMap implements OnInit, OnChanges {

  @ViewChild('map') mapElement: ElementRef;
  @Input() places: Place[];

  private yamapsLoad: boolean = false;
  map: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  /**
   * loads map on view shown
   */
  ngOnInit(): void {
    Geolocation.getCurrentPosition().then((resp) => {
        ymaps.ready(this.loadMap(resp.coords.latitude, resp.coords.longitude));
      }
    ).then(() => {
      this.drawPointers();// draw to map pointers from place
    }).catch((error) => {
      ymaps.ready(this.loadMap());
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    if (this.yamapsLoad) {
      this.clearMap();
      this.drawPointers();
    }
  }


  loadMap(latitude = 55.76, longitude = 37.64): void {
    this.map = new ymaps.Map('map', {
      center: [latitude, longitude], // Москва
      zoom: 10
    }, {
      searchControlProvider: 'yandex#search'
    });
    this.yamapsLoad = true;
  }

  drawPointers() {
    if (this.places != null) {
      this.places.forEach((place) => {
        console.log(place.latitude, place.longitude);
        this.map.geoObjects.add(YandexMap.createPlacemark(place));
      });
    }
  }

  clearMap() {
    this.map.geoObjects.removeAll();
  }

  /**
   * @return {ymaps.Placemark}
   */
  static createPlacemark(place : Place): any {
    return new ymaps.Placemark([place.latitude, place.longitude], {
      balloonContent: `${place.type}</br>${place.name}`
    }, {
      preset: 'islands#icon',
    });
  }
}
