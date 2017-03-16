import {Injectable} from '@angular/core';
import {Geolocation} from 'ionic-native';
/*
 Service that calc distance between geopoints
 */
@Injectable()
export class GeolocationService {

  private location: {lat: number, lng: number};

  constructor() {
    Geolocation.getCurrentPosition().then((res) => {
      this.location = {lat: res.coords.latitude, lng: res.coords.longitude};
    });
  }

  private getGeolocation(): void {
    Geolocation.getCurrentPosition().then((res) => {
      this.location = {lat: res.coords.latitude, lng: res.coords.longitude};
    });
  }

  public getLocation() : ({lat: number, lng: number}){
    return this.location;
  }

  public getDistanceFromLatLonInKm(lat2, lon2): number {
    let lat1 = this.location.lat;
    let lon1 = this.location.lng;

    let R = 6371; // Radius of the earth in km
    let dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
    let dLon = this.deg2rad(lon2 - lon1);
    let a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);

    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c; // Distance in km
    return d;
  }

  private deg2rad(deg): number {
    return deg * (Math.PI / 180)
  }


}
