import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import * as config from '../config/prod.config';
import {Http, Headers, Response, URLSearchParams} from "@angular/http";
import 'rxjs';
import {Place} from "../models/place.model";
import {AuthService} from "./auth.service";
import {Order} from "../models/order.model";

@Injectable()
export class PaymentService {
  private API_URL: string = config.default.API_PATH;
  private API_ERR: string = config.default.API_ERROR;
  private headers: Headers = new Headers();
  private token: string = AuthService.getCurrentUser().token;

  constructor(private http: Http) {
    this.headers.append("Authorization", `Bearer ${this.token}`);
  }

  /**
   * POST
   */
  public sendPayment(): Observable<boolean> {
    return this.http.post(``, {}, {headers: this.headers})
      .map((res: Response) => {
        return true;
      });
  }


}
