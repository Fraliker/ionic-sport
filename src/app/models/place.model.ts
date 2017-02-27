export class Place {
  image: string;
  imageLogo: string;
  type: string;
  name: string;
  adress: string;
  distance: number;
  latitude: number;
  longitude: number;

  constructor(obj) {
    this.image = 'http://2.wlimg.com/product_images/bc-full/dir_21/601811/tennis-court-construction-1705242_service_image.jpg'
      || obj.image ;//&& null;
    this.imageLogo = 'https://thumb9.shutterstock.com/display_pic_with_logo/1453121/299886746/stock-vector-vector-illustration-for-logo-for-lawn-tennis-consisting-of-ground-orange-tennis-court-net-racket-299886746.jpg'
      || obj.imageLogo;
    this.type = 'Спортивный клуб' || obj.type;
    this.name = 'Балашиха' || obj.name;
    this.adress = 'Москва ул. Правды 10' || obj.adress;
    this.latitude = obj.latitude || 0;
    this.longitude = obj.longitude || 0;
    this.distance = obj.distance || 0;
  }
}
