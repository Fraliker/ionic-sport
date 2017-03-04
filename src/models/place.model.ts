import {PlayingField} from './playing-field.model';
import {PlaceService} from "./place-service";

export class Place {
  image: string;
  imageLogo: string;
  type: string;
  name: string;
  address: string;
  distance: number;
  latitude: number;
  longitude: number;
  id: number;
  playingFields: PlayingField[]= [];
  services : PlaceService[] = [];

  constructor(obj) {
    this.id = obj.id || null;
    this.image = obj.image ||
      'http://2.wlimg.com/product_images/bc-full/dir_21/601811/tennis-court-construction-1705242_service_image.jpg';
    this.imageLogo = obj.imageLogo ||
      'https://thumb9.shutterstock.com/display_pic_with_logo/1453121/299886746/stock-vector-vector-illustration-for-logo-for-lawn-tennis-consisting-of-ground-orange-tennis-court-net-racket-299886746.jpg';
    this.type = obj.type || 'Спортивный клуб';
    this.name =  obj.name || 'Балашиха';
    this.address = obj.address || 'Москва ул. Правды 10';
    this.latitude = obj.latitude || 0;
    this.longitude = obj.longitude || 0;
    this.distance = obj.distance || 0;

    obj.playingFields.forEach((item) => {this.playingFields.push(new PlayingField(item))});

    obj.playingFields.forEach((item) => {this.services.push(new PlayingField(item))});
  }
}
