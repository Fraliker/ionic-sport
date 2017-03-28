import {
  Component, ViewChild, ElementRef, OnInit, Input, OnChanges, SimpleChanges, EventEmitter,
  Output
} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Geolocation} from 'ionic-native';
import {Place} from "../../../models/place.model";

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
        // ymaps.ready(this.loadMap(resp.coords.latitude, resp.coords.longitude));
        ymaps.ready(this.loadMap(55.76, 37.64));
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
      zoom: 9
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

      this.map.evnents.add('click', (e) => {
        console.log(e.get('domEvent'));
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
      balloonContent: `<div class="balloon">
                            <div class="balloon__col1">
                              <img class="balloon__logo" src="${place.imageLogo}">
                            </div>
                            <div class="balloon__col2">
                               <h2 class="balloon__header">${place.name}</h2>
                               <p>${place.address}</p>
                               <p class="balloon__distance">${place.distance.toFixed(0)} км от Вас</p>
                            </div>
                       </div>
                       <div class="balloon__button">
                          Выбрать площадку
                       </div>`
    }, {
      preset: 'islands#governmentCircleIcon',
      iconLayout: 'default#image',
      iconImageHref: place.imageLogo,
      iconImageSize: [40, 40],
      iconImageOffset: [-20, -20],
      iconColor: '#3b5998'
    });

    //adding events for placemark redirect
    placemark.events.add('click', function (e) {
      // e.preventDefault();
      // e.stopPropagation();
      // eventEmitter.emit(place);
      // console.log('1', e);
    });

    return placemark;
  }
}
