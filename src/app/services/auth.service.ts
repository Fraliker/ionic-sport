import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import * as config from '../../config/prod.config';
import {Http} from "@angular/http";
import {Storage} from '@ionic/storage';
import 'rxjs';
import {User} from "../models/user.model";

@Injectable()
export class AuthService {
  private API_URL: string = config.default.API_PATH;
  storage = new Storage(['localstorage']);

  constructor(private http: Http) {
  }

  /**
   * If token exist, user is logged
   * @return {boolean}
   */
  isAuthentificated(): Promise<User> {
    return this.storage.get("currentUser");
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

  public checkSMSCode(user: User): Observable<boolean> {

    return this.http.post(`${this.API_URL}auth/signin`, {code: user.code}).map((res) => {
      console.log(res.json());
      user.setToken(res.json());
      this.saveUser(user);

      return true;
    });
  }

  saveUser(user: User) {
    this.storage.set('currentUser', user);
    this.storage.get('currentUser').then((data) => {
      console.log(data);
    });
  }
}
