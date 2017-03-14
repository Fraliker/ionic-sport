import {Injectable} from '@angular/core';
import * as config from '../../config/prod.config';
import {Http, Headers, Response, URLSearchParams} from "@angular/http";
import 'rxjs';
import {AuthService} from "../../providers/auth.service";
import {Observer, Observable} from "rxjs";
import {Booking} from "../../models/Booking";
import {User} from "../../models/user.model";

@Injectable()
export class DashboardService {

  private API_URL: string = config.default.API_PATH;
  private headers: Headers = new Headers();
  private token: string = AuthService.getCurrentUser().token;

  constructor(private  http: Http) {
    this.headers.append("Authorization", `Bearer ${this.token}`);
  }

  getOwnBookings(): Observable<Booking[]> {
    return this.http.get(`${this.API_URL}bookings/my-bookings`, {headers: this.headers})
      .map(this.parseBookings);
  }

  getBooking(id: number): Observable<Booking> {

    let urlParams = new URLSearchParams();
    urlParams.append('id', id.toString());

    return this.http.get(`${this.API_URL}bookings/my-booking`, {headers: this.headers, search: urlParams})
      .map((res) => {
        console.log(res.json());
        return res.json();
      });
  }

  parseBookings(res: Response) {

    let data = res.json();

    // console.log(data);

    let arr = [];
    data.forEach((item) => {
      // console.log(item);
      arr.push(new Booking(item));
    });

    return arr;
  }

  parseData(res: Response) {
    let data = res.json();
    return data;
  }
}
