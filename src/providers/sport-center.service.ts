import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import * as config from '../config/prod.config';
import {Http, Headers, Response, URLSearchParams} from "@angular/http";
import 'rxjs';
import {Place} from "../models/place.model";
import {AuthService} from "./auth.service";
import {Order} from "../models/order.model";

@Injectable()
export class SportCenterService {

  private API_URL: string = config.default.API_PATH;
  private headers: Headers = new Headers();
  private token: string = AuthService.getCurrentUser().token;

  constructor(private  http: Http) {
    this.headers.append("Authorization", `Bearer ${this.token}`);
  }

  public getSportCenters(date: Date): Observable<Place[]> {

    let params = new URLSearchParams();
    params = this.divideDate(params, date);

    return this.http.get(`${this.API_URL}sport-centers/list`, {headers: this.headers, search: params})
      .map(this.parseSportCenters);
  }

  public checkSportCenter(date: Date, place: Place): Observable<Place> {

    let params = new URLSearchParams();
    params.append('id', '' + place.id);
    params = this.divideDate(params, date);

    return this.http.get(`${this.API_URL}sport-centers/sport-center`, {headers: this.headers, search: params})
      .map((res: Response) => {
        console.log(res);
        return new Place(res.json());
      });
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

  //TODO place order return value
  public placeOrder(order: Order): Observable<boolean> {

    let orderRequest = this.transformOrderForRequest(order);
    return this.http.post(`${this.API_URL}bookings/create-booking`, orderRequest, {headers: this.headers})
      .map((res: Response) => {
        return true;
      });
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
      'availableTimeId' : availableTimeId,
      'year' : date.getFullYear(),
      'month' : date.getMonth(),
      'day' : date.getDate(),
      'serviceIds' : serviceIds
    };
  }
}
