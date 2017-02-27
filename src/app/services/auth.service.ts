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
  public login(name: string, phone: string): Observable<string> {

    return this.http.post((this.API_URL + "auth/registration"), {name: name, phone: phone})
      .map((res) => {
        let code = res.json();
        return code;
      });
  }

  public checkSMSCode(code: string): Observable<boolean> {

    return this.http.post(`${this.API_URL}auth/signin`, {code : code}).map((res) => {
      console.log(res.json());
      //TO DO save token to ionic storage

      return true;
    });
  }
}
