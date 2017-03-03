import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import * as config from '../../config/prod.config';
import {Http, Headers, Response, URLSearchParams} from "@angular/http";
import 'rxjs';
import {Place} from "../models/place.model";
import {AuthService} from "./auth.service";

@Injectable()
export class SportCenterService {

  private API_URL: string = config.default.API_PATH;
  private headers: Headers = new Headers();
  private token: string = AuthService.getCurrentUser().token;

  constructor(private  http: Http) {

    this.headers.append("Authorization", `Bearer ${this.token}`);
  }


  getSportCenters(): Observable<Place[]> {

    let params = new URLSearchParams();
    params.append('year', '2017');
    params.append('month', '3');
    params.append('day', '22');
    params.append('hour', '14');
    params.append('type', 'work');

    return this.http.get(`${this.API_URL}sport-centers/list`, {headers: this.headers, search: params})
            .map(this.parseSportCenters);
  }

  parseSportCenters(res: Response) {
    let arr = [];
    let respData = res.json();
    respData.forEach((item) => {
      arr.push(new Place(item))
    });

    return arr;
  }
}
