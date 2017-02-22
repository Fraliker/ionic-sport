import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import * as config from '../../config/prod.config';
import {Http} from "@angular/http";
import 'rxjs';

@Injectable()
export class AuthService {
  private API_URL: string = config.default.API_PATH;

  constructor(private http: Http) {
  }

  /**
   * If token exist, user is logged
   * @return {boolean}
   */
  isAuthentificated(): boolean {
    let user = localStorage.getItem('user');
    return !!user;
  }

  /**
   * @param name
   * @param phone
   * @return {Observable<boolean>}
   */
  public login(name: string, phone: string): Observable<boolean> {

    return this.http.post((this.API_URL + "auth/signin"), JSON.stringify({name: name, phone: phone}))
      .map((res) => {
        console.log(res);
        return true;
      });
  }

  public checkSMSCode(code): Observable<boolean> {
    return this.http.get(this.API_URL, ).map(res => {
      return true;
    });
  }
}
