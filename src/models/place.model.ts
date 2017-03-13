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
  description: string;
  playingFields: PlayingField[] = [];
  services: PlaceService[] = [];

  constructor(obj) {

    this.id = obj.id || null;
    this.image = (obj.image != null) ? obj.image.origin
      : 'http://2.wlimg.com/product_images/bc-full/dir_21/601811/tennis-court-construction-1705242_service_image.jpg';
    this.imageLogo = (obj.logo != null) ? obj.logo.origin
      : 'https://thumb9.shutterstock.com/display_pic_with_logo/1453121/299886746/stock-vector-vector-illustration-for-logo-for-lawn-tennis-consisting-of-ground-orange-tennis-court-net-racket-299886746.jpg';
    this.type = obj.type || 'Спортивный клуб';
    this.name = obj.name || 'Балашиха';
    this.address = obj.address || 'Москва ул. Правды 10';
    this.latitude = obj.latitude || 0;
    this.longitude = obj.longitude || 0;
    this.distance = obj.distance || 0;
    this.description = obj.description || '';

    if (obj.playingFields && obj.playingFields.length != 0)
      obj.playingFields.forEach((item) => {
        this.playingFields.push(new PlayingField(item))
      });

    if (obj.services && obj.services.length != 0)
      obj.services.forEach((item) => {
        this.services.push(new PlayingField(item))
      });
  }
}
