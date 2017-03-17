import {
  Component, ViewChild, ElementRef, OnInit, Input, OnChanges, SimpleChanges, EventEmitter,
  Output
} from '@angular/core';
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
  @Output() placemarkClick: EventEmitter<Place> = new EventEmitter();

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
        if (place.latitude === 0 && place.longitude === 0) {
          console.debug('Map ignored place ---- bacause of coordinates', place);
        } else {
          this.map.geoObjects.add(this.createPlacemark(place, this.placemarkClick));
        }
      });
    }
  }

  clearMap() {
    this.map.geoObjects.removeAll();
  }

  /**
   * @return {ymaps.Placemark}
   */
  createPlacemark(place: Place, eventEmitter: any): any {

    let placemark = new ymaps.Placemark([place.latitude, place.longitude], {
      balloonContent: `${place.type}</br>${place.name}`
    }, {
      preset: 'islands#icon',
      // Опции.
      // Необходимо указать данный тип макета.
      iconLayout: 'default#image',
      // Своё изображение иконки метки.
      iconImageHref: 'assets/images/map-marker.png',
      // Размеры метки.
      iconImageSize: [80, 80],
      // Смещение левого верхнего угла иконки относительно
      // её "ножки" (точки привязки).
      iconImageOffset: [-40, -40]
    });

    //adding events for placemark redirect
    placemark.events.add('click', function (e) {
      e.stopPropagation();
      eventEmitter.emit(place);
    });

    return placemark;
  }
}
