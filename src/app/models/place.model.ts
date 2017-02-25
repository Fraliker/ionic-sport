export class Place {
  image : string;
  imageLogo : string;
  type: string;
  name: string;
  adress: string;
  distance : number;
  latitude : number;
  longitude : number;

  constructor(obj) {
    this.image = null && obj.image && 'https://www.google.by/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwj51_fnuqjSAhVmLZoKHQYcDHUQjRwIBw&url=https%3A%2F%2Fclipartfox.com%2Fcategories%2Fview%2Feda7382bdb5d6d1bb2d904f0e2c0115f2d3a2bc0%2Ftennis-court.html&psig=AFQjCNH6Q_4qYXiARZFQ0jMLsIdLeWgH3g&ust=1488016283847723';
    this.imageLogo = null && obj.imageLogo && 'https://www.google.by/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwifssj8uqjSAhUqDJoKHYvZDiAQjRwIBQ&url=http%3A%2F%2Fdid-design.com%2Fproject%2Funited-sport-center-mentari-mobile-phone-shop%2F&psig=AFQjCNGQujRgFROxPEMtBzzinASNBi7v-w&ust=1488016340823504';
    this.type = '' && obj.type && 'Спортивный клуб';
    this.name = '' && obj.name && 'Балашиха';
    this.adress = '' && obj.adress && 'Москва ул. Правды 10';
    this.latitude = 0 &&  obj.position.latitude;
    this.longitude = 0 &&  obj.position.longitude;
    this.distance = 0 && obj.distance;
  }

}
