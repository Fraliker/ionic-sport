import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import * as config from '../config/prod.config';
import {Http, Headers, Response, URLSearchParams} from "@angular/http";
import 'rxjs';
import {Place} from "../models/place.model";
import {AuthService} from "./auth.service";
import {Order} from "../models/order.model";
import {Geolocation} from 'ionic-native';

@Injectable()
export class SportCenterService {

  private API_URL: string = config.default.API_PATH;
  private API_ERR: string = config.default.API_ERROR;
  private headers: Headers = new Headers();
  private token: string = AuthService.getCurrentUser().token;
  public position: {lat: number, lng: number};


  constructor(private  http: Http) {
    this.headers.append("Authorization", `Bearer ${this.token}`);

    Geolocation.getCurrentPosition().then((res) => {
      this.position = {lat: res.coords.latitude, lng: res.coords.longitude};
    }).catch((err) => {
      console.error('Cannot load geo data ' + err);
      // if cannot load geodata - set Moscow as default value
      this.position = {lat: 55.7819219, lng: 37.5061349};
    });
  }

  /**
   * GET request
   * @param date
   * @return {Observable<Place[]>}
   */
  public getSportCenters(date: Date): Observable<Place[]> {

    let params = new URLSearchParams();
    params = this.divideDate(params, date);

    return this.http.get(`${this.API_URL}sport-centers/list`, {headers: this.headers, search: params})
      .map(this.parseSportCenters)
      .map((places: Place[]) => {
        return this.updateDistance(places);
      })
      .catch(this.handleError);
  }

  /**
   * GET request
   * @param date
   * @param place {Place}
   * @return {Observable<Place>}
   */
  public checkSportCenter(date: Date, place: Place): Observable<Place> {

    let params = new URLSearchParams();
    params.append('id', '' + place.id);
    params = this.divideDate(params, date);

    return this.http.get(`${this.API_URL}sport-centers/sport-center`, {headers: this.headers, search: params})
      .map((res: Response) => {
        return new Place(res.json());
      })
      .map((place: Place) => {
        if (place.latitude != 0 && place.longitude != 0) {
          place.distance =
            this.getDistanceFromLatLonInKm(this.position.lat, this.position.lng, place.latitude, place.longitude);
        } else {
          place.distance = null;
        }
        return place;
      })
      .catch(this.handleError);
  }

  /**
   * Divide date to many items
   * @param params
   * @param date
   * @return {URLSearchParams}
   */
  private divideDate(params: URLSearchParams, date): URLSearchParams {

    params.append('year', '' + date.getFullYear());
    params.append('month', '' + date.getMonth());
    params.append('day', '' + date.getDate());
    params.append('hour', '' + date.getHours());
    if (date.getDay() > 5) {
      params.append('type', 'weekend');
    } else {
      params.append('type', 'work');
    }

    return params;
  }

  private parseSportCenters(res: Response) {
    let arr = [];
    let respData = res.json();

    if (respData != null) {
      respData.forEach((item) => {
        arr.push(new Place(item))
      });
    }

    return arr;
  }

  public placeOrder(order: Order): Observable<string> {

    let orderRequest = this.transformOrderForRequest(order);
    return this.http.post(`${this.API_URL}bookings/create-booking`, orderRequest, {headers: this.headers})
      .map((res: Response) => {
        return res.json().id;
      })
      .catch(this.handleError);
  }

  private transformOrderForRequest(order: Order): Object {

    // get time id
    let availableTimeId = 0;
    order.place.playingFields.forEach((item) => {
      if (item.name == order.playground) {
        availableTimeId = item.availableTimeId;
      }
    });
    //date parse
    let date = new Date(order.time);
    //services
    let serviceIds = [];
    order.orderList.forEach((orderItem) => {
      order.place.services.forEach((service) => {
        if (service.name == orderItem) {
          serviceIds.push({'id': service.id});
        }
      });
    });

    return {
      'availableTimeId': availableTimeId,
      'year': date.getFullYear(),
      'month': date.getMonth(),
      'day': date.getDate(),
      'serviceIds': serviceIds,
      'comment' : order.comment,
      'phone' : order.user.phone
    };
  }

  public updateDistance(places: Place[]): Place[] {
    let arr = Array.from(places);

    arr.forEach((item) => {
      if (item.latitude != 0 && item.longitude != 0) {
        item.distance =
          this.getDistanceFromLatLonInKm(this.position.lat, this.position.lng, item.latitude, item.longitude);
      } else {
        item.distance = null;
      }
    });
    return arr;
  }

  private getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2): number {

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

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.log(errMsg);

    this.http.post(this.API_ERR, {errorText: errMsg}).map(res => res).subscribe((res)=>{
      console.log(res);
    });

    return Observable.throw(errMsg);
  }
}
