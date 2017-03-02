import {Injectable} from '@angular/core';
import * as config from '../../config/prod.config';
import {Http, Headers, Response} from "@angular/http";
import 'rxjs';
import {AuthService} from "../../app/services/auth.service";
import {Observer, Observable} from "rxjs";
import {Booking} from "../../app/models/Booking";
import {User} from "../../app/models/user.model";

@Injectable()
export class DashboardService {

  private API_URL: string = config.default.API_PATH;
  private headers: Headers = new Headers();
  private token: string = AuthService.getCurrentUser().token;

  constructor(private  http: Http) {
    this.headers.append("Authorization", `Bearer ${this.token}`);
  }

  getOwnBookings(): Observable<Booking[]> {
    return this.http.get(`${this.API_URL}bookings/my-booking`, {headers: this.headers})
      .map(this.parseData);
  }

  parseData(res: Response) {
    let data = res.json();
    return data;
  }
}
